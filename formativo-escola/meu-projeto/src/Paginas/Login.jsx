// axios faz as requisições Http(s), ou seja posso consulatr um backend
import axios from 'axios';
// Validar aquilo que foi colocado, antes de mandar para o backend
import { useNavigate } from 'react-router-dom';
import estilos from './Login.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Cabecalho } from '../Componentes/Cabecalho';
import { Footer } from '../Componentes/Footer';
 
// pegar do backend
const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe um nome')
        .max(25, 'Informe no máximo 25 caracteres'),
    password: z.string()
        .min(1, 'Informe uma senha')
        .max(15, 'Informe no máximo 15 caracteres')
});
 
export function Login() {
    // registra todas as infomações que são dadas pelo usuario e tenta resolver de acordo com o schema
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
    // ver o que esta sendo resgatado
    async function obterDadosFormulario(data) {
        console.log(`Dados: ${data}`)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
 
            const { access, refresh, user } = response.data;
 
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('tipo', user.tipo);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username', user.username);
 
            console.log('Login bem-sucedido!');          
            navigate('/inicial');
         
 
        } catch (error) {
            console.error('Erro de autenticação', error);
            alert("Dados Inválidos, por favor verifique suas credenciais");
        }
    }
 
    return (

        <>
        <Cabecalho/>
        <div className={estilos.container}>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>
                <h2 className={estilos.titulo}>Login</h2>
                {/* registrar o que o usuario fez input no usermane */}
                <label className={estilos.label}>Usuário:</label>
                <input
                    {...register('username')}
                    placeholder='username'
                    className={estilos.inputField}
                    
                />
                {/* se houver erro no username, pegar a mensagem de erro lá emcima */}
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                 {/* se houver algum erro no password, pegar a mensagem de erro lá emcima */}
                <label className={estilos.label}>Senha: </label>
                <input
                    {...register('password')}
                    placeholder='Senha'
                    type="password"
                    className={estilos.inputField}
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}
 
                <button type="submit" className={estilos.submitButton}>Entrar</button>
            </form>
        </div>
        <Footer/>
        </>
    );
}
 