from rest_framework.permissions import BasePermission

# has_object_permission ->  permissao para consultar um obj especifico
# has_permission -> é a permissaão para consultar a APIView


class IsGestor(BasePermission):
    message = "Este recurso só é acessivel por um gestor"
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == 'G'
    
class IsProfessor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == 'P'
    
class IsDonoOuGestor(BasePermission):
    def has_object_permission(self, request, view, obj):
       if request.user.tipo == 'G':
            return True
       return obj.professor == request.user
     

