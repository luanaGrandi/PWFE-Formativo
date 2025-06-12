import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 

const schemaDisciplina = z.object({
    username: z.string()
        .min(5, 'Informe ao menos dez caractere')
        .max(100, 'Informe até 100 caracteres'),
    last_name: z.string()
        .min(5, 'Informe ao menos dez caractere')
        .max(100, 'Informe até 100 caracteres'),
    first_name: z.string()
        .min(5, 'Informe ao menos dez caractere')
        .max(100, 'Informe até 100 caracteres'),
    password: z.string()
        .min(4, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    ni: z.number({ invalid_type_error: 'NI deve ser um número' })
        .int('NI deve ser inteiro')
        .positive('NI deve ser positivo'),
    telefone: z.string()
        .min(5, 'Informe 19 caracteres')
        .max(19, 'Informe até 19 caracteres'),
    data_nascimento: z.string()
        .min(10, 'data invalida')
        .max(10, 'data invalida'),
    data_contratacao: z.string()
        .min(10, 'data invalida')
        .max(10, 'data invalida'),
});
 
export function ProfessoresEditar() {
 
    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });
 
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resProfessor = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                    headers: {
                         'Authorization': `Bearer ${token}` 
                        }
                });
 
                // Preenche o formulário
                reset(resProfessor.data);
 
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/usuario/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Professor cadastrado com sucesso!', response.data);
            alert('Professor editada com sucesso!');
            reset();
            navigate('/inicial/professores');
 
        } catch (error) {
            console.error('Erro ao cadastrar Professor', error);
            alert("Erro ao editar professor");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                               <h2 className={estilos.titulo}>Editar Professor</h2>
                               <label className ={estilos.nomeCampo} >Primeiro nome</label>
                               <input                        
                                   className={estilos.inputField}
                                   {...register('first_name')}
                                   placeholder="Luana"
                               />
                               {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}
                          
            
                               <label className ={estilos.nomeCampo}>Sobrenome</label>
                               <input
                                   className={estilos.inputField}
                                   {...register('last_name')}
                                   placeholder="Grandi"
                               />
                               {errors.last_name && <p className={estilos.error}>{errors.last_name.message}</p>}
                          
            
                               <label className ={estilos.nomeCampo}>username</label>
                               <input
                               //  type="number"
              
                                   className={estilos.inputField}
                                   {...register('username')}
                                   placeholder="luana Grandi"
                               />
                               {errors.username &&
                               <p className={estilos.error}>
                                   {errors.username.message}
                               </p>}
                          
                                <label className ={estilos.nomeCampo}>NI</label>
                                <input  className={estilos.inputField}
                                    type="number"
                                    {...register('ni', { valueAsNumber: true })}
                                    placeholder="1234"
                                    />
                                    {errors.ni && <p>{errors.ni.message}</p>}

           
           
                               <label className ={estilos.nomeCampo}>Telefone</label>
                               <input
                                   className={estilos.inputField}
                                   {...register('telefone')}
                                   placeholder="(XX) XXXXXXXXX"
                                   />
                                   {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}
                          
                               <label className={estilos.nomeCampo}>Data de nascimento</label>
                               <input
                                   type="date"
                                   className={estilos.inputField}
                                   {...register('data_nascimento')}
                                   placeholder="yyyy-mm-dd"
                                   />
                                   {errors.data_nascimento && (
                                       <p className={estilos.error}>{errors.data_nascimento.message}</p>
                                   )}
           
                               <label className={estilos.nomeCampo}>Data de contratação</label>
                               <input
                                   type="date"
                                   className={estilos.inputField}
                                   {...register('data_contratacao')}
                                   placeholder="yyyy-mm-dd"
                                   />
                                   {errors.data_contratacao && (
                                       <p className={estilos.error}>{errors.data_contratacao.message}</p>
                                   )}
           
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
}