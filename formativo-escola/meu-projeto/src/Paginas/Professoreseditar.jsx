import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const schemaDisciplina = z.object({
    first_name: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    last_name: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    username: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    email: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),
    tipo: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(1, 'Informe ao menos um caractere')
        
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
                        placeholder="luana"
                    />
                    {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Segundo nome</label>
                    <input
                        className={estilos.inputField}
                        {...register('last_name')}
                        placeholder="Grandi"
                    />
                    {errors.last_name && <p className={estilos.error}>{errors.last_name.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Nome inteiro</label>
                    <input
                    //  type="number"
   
                        className={estilos.inputField}
                        {...register('username')}
                        placeholder="Luana Grandi"
                    />
                    {errors.username &&
                    <p className={estilos.error}>
                        {errors.username.message}
                    </p>}
                    
                    
                    <label className ={estilos.nomeCampo}>email</label>
                    <input
                    //  type="number"
   
                        className={estilos.inputField}
                        {...register('email')}
                        placeholder="exemplo@gmail.com"
                    />
                    {errors.email &&
                    <p className={estilos.error}>
                        {errors.email.message}
                    </p>}
               

                    <label className ={estilos.nomeCampo}>tipo</label>
                    <select className={estilos.inputField}
                        {...register('tipo', { valueAsNumber: true })}>
                            <option  value="">Selecione um tipo</option>
                            {professores.map((prof) => (
                                <option className={estilos.inputField} >
                                {prof.tipo}
                                </option>
                            ))}
            
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
 
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
}