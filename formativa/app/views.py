from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Usuario, Sala, ReservaAmbiente, Disciplina
from .serializers import UsuarioSerializer, DisciplinaSerializer, ReservaAmbienteSerializer,LoginSerializer, SalaSerializer
from .permissions import IsGestor, IsProfessor, IsDonoOuGestor
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import ValidationError
from django.http import Http404
from rest_framework.response import Response

class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    # só o gestor tera permissao de criar e listar
    permission_classes = [IsGestor]

# essa class vai consultar o usuario pelo Id, e fazer o GET, PUT e o DELETE
class UsuarioRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]
    # procurar pela pk (id do usuario)
    lookup_field = 'pk'
    
    # quando o gestor for apagar o usuario, aparecer uma mensagem 
    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response ({'mensagem':"O usuario foi excluido!"})
    
    # mensagem de erro, se o usuario não for encontrado
    def get_object(self):
        try:
            return super().get_object()
        except Exception:
            #return Response({'erro': 'Sala não encontrada'},status=status.HTTP_404_NOT_FOUND)
            raise Http404({'Erro': 'Usuario não encontrado'})
        
    
# class para listar todas as disciplinas ou cria-las
class DisciplinaListCreate(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsGestor()]
    
     # ver reserva do professor: exemplo professor , id 5 (ira listar as disciplinas  do professor do id 5)
    def get_queryset(self):
    # def get_queryset(self): -> definir a consulta que ele vai fazer
        queryset =  super().get_queryset()
        professor_id = self.request.query_params.get('professor', None)
        if professor_id:
            # filtrar disciplinas especificas de um professor
            queryset = queryset.filter(professor_id=professor_id)
        return queryset
    
    # verificar se a está sendo criado a mesma disciplina
    def perform_create(self, serializer):
        nome = serializer.validated_data['nome']
        curso = serializer.validated_data['curso']
        carga_horaria = serializer.validated_data['carga_horaria']
        descricao = serializer.validated_data['descricao']

        # verificar se os campos são iguais
        disciplinas_existentes = Disciplina.objects.filter(
            nome=nome,
            curso=curso,
            carga_horaria=carga_horaria,
            descricao=descricao
        )

        # se for iguais mostrar a mensagem de erro
        if disciplinas_existentes.exists():
            raise ValidationError("A disciplina já foi criada!")
        serializer.save()

# essa class vai  fazer o GET, PUT, DELETE e o PACTH
class DisciplinaRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    # quando o gestor for apagar a disciplina, aparecer uma mensagem 
    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response ({'mensagem':"Disciplina excluida com sucesso!"})


    # mesagem de erro, se a disciplina não for encontrada
    def get_object(self):
        try:
           return super().get_object()
        except Exception:
            #return Response({'erro': 'Sala não encontrada'},status=status.HTTP_404_NOT_FOUND)
            raise Http404({'Erro': 'Disciplina não encontrada'})

# listagem das disciplinas que o professor tem 
class DisciplinaProfessorList(ListAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        # filtrar todas as disciplinas do usuario(professor)
        return Disciplina.objects.filter(professor = self.request.user)

# ver todos os ambientes reservdos ou cria-los
class ReservaAmbienteListCreate(ListCreateAPIView):
    queryset = ReservaAmbiente.objects.all()
    serializer_class = ReservaAmbienteSerializer

    # so o gestor tem a permissão de fazer o GET das reservas de ambiente
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return[IsGestor()]
    
    # ver reserva do professor: exemplo professor , id 5 (ira listar os ambientes reservados do professor do id 5)
    def get_queryset(self):
    # def get_queryset(self): -> definir a consulta que ele vai fazer
        queryset =  super().get_queryset()
        professor_id = self.request.query_params.get('professor', None)
        if professor_id:
            # filtrar ambiente especifico de um professor
            queryset = queryset.filter(professor_id=professor_id)
        return queryset
    
    # verificar se está sendo criado o mesmo ambiente
    def perform_create(self, serializer):
            data_inicio = serializer.validated_data['data_inicio']
            data_termino = serializer.validated_data['data_termino']
            sala_reservada = serializer.validated_data['sala_reservada']
            periodo = serializer.validated_data['periodo']

            # verificar se os campos são iguais um dos outros
            reservas_existentes = ReservaAmbiente.objects.filter(
                sala_reservada=sala_reservada,
                data_inicio__lt=data_termino,
                data_termino__gt=data_inicio,
                periodo=periodo
            )

            # se os campos for iguais, exibir essa mesagem de erro
            if reservas_existentes.exists():
                raise ValidationError("Marque outro horario, esse já está em uso.")
            serializer.save()
    
# essa class pode fazer o GET, PUT, DELETE e o PACTH da reserva de ambiente
class ReservaAmbienteRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = ReservaAmbiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    permission_classes = [IsDonoOuGestor]
    lookup_field = 'pk'

    # quando o gestor for apagar a reserva de Ambiente, aparecer uma mensagem 
    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response ({'mensagem':"Reserva de ambiente excluida com sucesso!"})

    # mensagem de erro, se a reserva de ambinete não for encontrada
    def get_object(self):
        try:
            return super().get_object()
        except Exception:
            #return Response({'erro': 'Sala não encontrada'},status=status.HTTP_404_NOT_FOUND)
            raise Http404({'Erro': 'reserva de ambiente não encontrada'})

# listagem da reserva de ambientes que o professor tem
class ReservaAmbienteProfessorList(ListAPIView):

    serializer_class = ReservaAmbienteSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        # filtrar as reservas de um professor especifico
        return ReservaAmbiente.objects.filter(professor = self.request.user)
   
# login do admin
class loginView(TokenObtainPairView):
    serializer_class = LoginSerializer

# essa class ira listar e criar salas, mas epenas o gestor pode criar
class salasListCreate(ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    # só o gestor tera permissao de criar e listar
    permission_classes = [IsGestor]

    # verificar se está sendo criada a mesma sala
    def perform_create(self, serializer):
            nome = serializer.validated_data['nome']
            capacidade_alunos = serializer.validated_data['capacidade_alunos']
        
            # verificar se os campos são iguais um dos outros
            salas_existentes = Sala.objects.filter(
                nome=nome,
                capacidade_alunos=capacidade_alunos,
            )
            # se os campos for iguais, exibir essa mesagem de erro
            if salas_existentes.exists():
                raise ValidationError("Essa sala já existe.")
           
# essa class vai consultar as salas pelo Id, e fazer o GET, PUT e o DELETE
class SalaRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    # quando o gestor for apagar a sala, aparecer uma mensagem 
    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response ({'mensagem':"sala excluida com sucesso!"})


    # resposta de erro, quando a sala não for encontrada
    def get_object(self):
        try:
           return super().get_object()
        except Exception:
            #return Response({'erro': 'Sala não encontrada'},status=status.HTTP_404_NOT_FOUND)
            raise Http404({'Erro': 'Sala não encontrada'})