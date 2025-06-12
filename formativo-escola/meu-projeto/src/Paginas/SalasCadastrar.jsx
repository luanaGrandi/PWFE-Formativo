import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useNavigate } from 'react-router-dom';


const schemaSala = z.object({
  nome: z.string()
    .min(1, 'Informe ao menos um caractere')
    .max(100, 'Informe até 100 caracteres'),
  capacidade_alunos: z.number({
      invalid_type_error: 'Informe a capacidade corretamente'
    })
    .int('Deve ser um número inteiro')
    .min(1, 'Capacidade mínima é 1')
    .max(500, 'Capacidade máxima é 500'),

});

export function SalasCadastrar() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaSala)
  });

async function enviarDadosFormulario(data) {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post('http://127.0.0.1:8000/api/salas/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Sala cadastrada com sucesso!', response.data); // Agora response está definido
    alert('Sala cadastrada com sucesso!');
    reset();
   
  } catch (error) {
    console.error('Erro ao cadastrar sala', error);
    alert('Erro ao cadastrar sala');
  }
}
  return (
    <>
     

      <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(enviarDadosFormulario)}>
          <h2 className={estilos.titulo}>Cadastrar Sala</h2>

          <label className={estilos.nomeCampo}>Nome da Sala</label>
          <input
            className={estilos.inputField}
            {...register('nome')}
            placeholder="sala1"
          />
          {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}

          <label className={estilos.nomeCampo}>Capacidade</label>
          <input
            type="number"
            className={estilos.inputField}
            {...register('capacidade_alunos', { valueAsNumber: true })}
            placeholder="150"
          />
          {errors.capacidade_alunos && <p className={estilos.error}>{errors.capacidade_alunos.message}</p>}

          <div className={estilos.icones}>
            <button className={estilos.submitButton} type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>

    
    </>
  );
}