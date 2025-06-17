import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const schemaSalas = z.object({
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


 
export function SalaEditar() {
 
    const [salas, setSalas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaSalas)
    });
 
    useEffect(() => {
        async function buscarSalas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/salas/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSalas(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const ressalas = await axios.get(`http://127.0.0.1:8000/api/salas/${id}/`, {
                    headers: {
                         'Authorization': `Bearer ${token}` 
                        }
                });
 
                // Preenche o formulário
                reset(ressalas.data);
 
            } catch (error) {
                console.error("Erro ao carregar reservas", error);
            }
        }
        buscarSalas();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/salas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Sala editada com sucesso!', response.data);
            alert('reserva editada com sucesso!');
            reset();
            navigate('/inicial/salas');
 
        } catch (error) {
            console.error('Erro ao editar reserva', error);
            alert("Erro ao editar reserva");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
          <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
            <h2 className={estilos.titulo}>editar Sala</h2>
    
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
      );
    }
    