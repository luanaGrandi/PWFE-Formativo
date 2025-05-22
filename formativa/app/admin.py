from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Sala, Disciplina, ReservaAmbiente

class UsuarioAdmin(UserAdmin):
    # lista do usuario
    list_display = ('tipo', 'username','telefone', 'ni', 'data_contratacao', 'data_nascimento')

    # qual campo ele vai comstrar quando clicar no usuario
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('tipo', 'telefone', 'ni')}),
    )

    # campos que vai aparecer quando for criar um novo usuario
    add_fieldsets = UserAdmin.add_fieldsets + (
    (None, {'fields': ('tipo', 'telefone', 'ni', 'data_contratacao', 'data_nascimento')}),
)

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Disciplina)
admin.site.register(Sala)
admin.site.register(ReservaAmbiente)