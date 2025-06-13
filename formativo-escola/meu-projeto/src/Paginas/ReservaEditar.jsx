import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const schemaReservas = z.object({
    periodo: z.enum(['M', 'T', 'N'], {
        errorMap: () => ({ message: 'Selecione um período válido' }),
    }),
    data_inicio: z.string().min(10, 'Data inválida'),
    data_termino: z.string().min(10, 'Data inválida'),
    sala_reservada: z.number({
        invalid_type_error: 'Selecione uma sala'
    }),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
    }),
    disciplina: z.number({
        invalid_type_error: 'Selecione uma disciplina'
    }),
});

 
export function ReservaEditar() {
 
    const [reservas, setreservas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaReservas)
    });
 
    useEffect(() => {
        async function buscarReserva() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/reservas/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setreservas(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resReserva = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
                    headers: {
                         'Authorization': `Bearer ${token}` 
                        }
                });
 
                // Preenche o formulário
                reset(resReserva.data);
 
            } catch (error) {
                console.error("Erro ao carregar reservas", error);
            }
        }
        buscarReserva();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/reservas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('reserva cadastrado com sucesso!', response.data);
            alert('reserva editada com sucesso!');
            reset();
            navigate('/inicial/reservas');
 
        } catch (error) {
            console.error('Erro ao cadastrar reserva', error);
            alert("Erro ao editar reserva");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Editar Reservas</h2>

                <label className={estilos.nomeCampo}>Período</label>
                <select className={estilos.inputField} {...register('periodo')}>
                    <option value="">Selecione o período</option>
                    <option value="M">Manhã</option>
                    <option value="T">Tarde</option>
                    <option value="N">Noite</option>
                </select>
                {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}

                <label className={estilos.nomeCampo}>Data de Início</label>
                <input
                    type="date"
                    className={estilos.inputField}
                    {...register('data_inicio')}
                />
                {errors.data_inicio && <p className={estilos.error}>{errors.data_inicio.message}</p>}

                <label className={estilos.nomeCampo}>Data de Término</label>
                <input
                    type="date"
                    className={estilos.inputField}
                    {...register('data_termino')}
                />
                {errors.data_termino && <p className={estilos.error}>{errors.data_termino.message}</p>}

                <label className={estilos.nomeCampo}>Sala</label>
                <select className={estilos.inputField} {...register('sala_reservada', { valueAsNumber: true })}>
                    <option value="">Selecione uma sala</option>
                    {salas.map(sala => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala_reservada && <p className={estilos.error}>{errors.sala_reservada.message}</p>}

                <label className={estilos.nomeCampo}>Professor</label>
                <select className={estilos.inputField} {...register('professor', { valueAsNumber: true })}>
                    <option value="">Selecione um professor</option>
                    {professores.map(prof => (
                        <option key={prof.id} value={prof.id}>
                            {prof.username}
                        </option>
                    ))}
                </select>
                {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}

                <label className={estilos.nomeCampo}>Disciplina</label>
                <select className={estilos.inputField} {...register('disciplina', { valueAsNumber: true })}>
                    <option value="">Selecione uma disciplina</option>
                    {disciplinas.map(dis => (
                        <option key={dis.id} value={dis.id}>
                            {dis.nome}
                        </option>
                    ))}
                </select>
                {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
}