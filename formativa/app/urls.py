from django.urls import path
from .views import loginView, UsuarioListCreate, UsuarioRetrieveUpdateDestroy, ReservaAmbienteListCreate, ReservaAmbienteRetrieveUpdateDestroy, ReservaAmbienteProfessorList, DisciplinaListCreate, DisciplinaRetrieveUpdateDestroy, DisciplinaProfessorList, salasListCreate, SalaRetrieveUpdateDestroy

urlpatterns = [
    # LOGIN
    path('login/', loginView.as_view()),

    # USUARIO
    path('usuario/', UsuarioListCreate.as_view()),
    path('usuario/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view()),

    # RESERVA DE AMBIENTE
    path('reservas/',ReservaAmbienteListCreate.as_view()),
    path('reservas/<int:pk>/', ReservaAmbienteRetrieveUpdateDestroy.as_view()),
    path('professor/reservas/', ReservaAmbienteProfessorList.as_view()),

    # DISCIPLINAS
    path('disciplinas/', DisciplinaListCreate.as_view()),
    path('disciplinas/<int:pk>/', DisciplinaRetrieveUpdateDestroy.as_view()),
    path('professor/disciplinas/', DisciplinaProfessorList.as_view()),

    # SALAS
    path('salas/', salasListCreate.as_view()),
    path('salas/<int:pk>/', SalaRetrieveUpdateDestroy.as_view()),
]