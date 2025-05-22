from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    # tipo de escolha
    TIPO_CHOICES = [
        ('G', 'Gestor'),
        ('P', 'Professor'),
    ]
    tipo = models.CharField(max_length=1, choices=TIPO_CHOICES, default='P')
    ni = models.IntegerField()
    telefone = models.CharField(max_length=20, blank=True, null=True)
    data_nascimento = models.DateField()
    data_contratacao = models.DateField()

    # campos obrigatorios
    REQUIRED_FIELDS = ['ni', 'data_nascimento', 'data_contratacao']

    # retornar o nome
    def __str__(self):
        return f'{self.username} ({self.get_tipo_display()})'
    # get_tipo_display -> ele pega o valor (professor) e não a chave(p)

class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    carga_horaria = models.IntegerField()
    descricao = models.TextField(blank=True, null=True)
    # chave estrangerira para class de usuario
    professor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'tipo': 'P'})
    # limit_choices_to={'tipo': 'P'} -> declara um limite do que o usario pode colocar (o usuario so pode colocar o 'P')

    # retorna um nome
    def __str__(self):
        return self.nome
    
class Sala(models.Model):
    nome = models.CharField(max_length=100)
    capacidade_alunos = models.IntegerField()

    # retorna o nome
    def __str__(self):
        return self.nome

class ReservaAmbiente(models.Model):
    # tipos de escolha do periodo
    PERIODO_CHOICES = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
    ]
    periodo = models.CharField(max_length=1, choices=PERIODO_CHOICES, default='M')
    data_inicio = models.DateField()
    data_termino = models.DateField()
    # chave estrangeira da class Sala
    sala_reservada = models.ForeignKey(Sala, on_delete=models.CASCADE)
    # chave estrangeira da class usuario
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': 'P'})
    # chave estrangeira da class Disciplina
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)

    def __str__(self):
        return  f'{self.sala_reservada} - {self.get_periodo_display()} ({self.data_inicio} a {self.data_termino})'