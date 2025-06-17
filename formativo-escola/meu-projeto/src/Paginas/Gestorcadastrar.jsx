import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';

const schemaGestor = z.object({
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

export function GestorCadastrar() {

    const [gestores, setGestores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaGestor)
    });

    useEffect(() => {
        async function buscarGestor() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Filtra só gestores com tipo === 'G'
                const gestoresFiltrados = response.data.filter((user) => user.tipo === 'G');
                setGestores(gestoresFiltrados);
            } catch (error) {
                console.error("Erro ao carregar gestores", error);
            }
        }
        buscarGestor();
    }, []);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');

            // Adiciona o campo tipo para indicar que é gestor
            const dataComTipo = { ...data, tipo: 'G' };

            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuario/',
                dataComTipo,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Usuário cadastrado com sucesso!', response.data);
            alert('Usuário cadastrado com sucesso!');
            reset();

            // Atualiza lista local para incluir o novo gestor
            setGestores((oldGestores) => [...oldGestores, response.data]);

        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);
            alert("Erro ao cadastrar usuário");
        }
    }

    return (
        <div className={estilos.conteiner}>

            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Cadastro de Gestores</h2>

                <label className={estilos.nomeCampo}>Primeiro nome</label>
                <input
                    className={estilos.inputField}
                    {...register('first_name')}
                    placeholder="Luana"
                />
                {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}

                <label className={estilos.nomeCampo}>Sobrenome</label>
                <input
                    className={estilos.inputField}
                    {...register('last_name')}
                    placeholder="Grandi"
                />
                {errors.last_name && <p className={estilos.error}>{errors.last_name.message}</p>}

                <label className={estilos.nomeCampo}>Username</label>
                <input
                    className={estilos.inputField}
                    {...register('username')}
                    placeholder="luana Grandi"
                />
                {errors.username &&
                    <p className={estilos.error}>
                        {errors.username.message}
                    </p>}

                <label className={estilos.nomeCampo}>NI</label>
                <input
                    className={estilos.inputField}
                    type="number"
                    {...register('ni', { valueAsNumber: true })}
                    placeholder="1234"
                />
                {errors.ni && <p>{errors.ni.message}</p>}

                <label className={estilos.nomeCampo}>Telefone</label>
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

                <label className={estilos.nomeCampo}>Senha</label>
                <input
                    type="password"
                    className={estilos.inputField}
                    {...register('password')}
                    placeholder="Senha"
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
