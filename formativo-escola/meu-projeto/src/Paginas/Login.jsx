// axios faz as requisições Http(s), ou seja posso consulatr um backend
import axios from 'axios';
// Validar aquilo que foi colocado, antes de mandar para o backend
import { useForm } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers';
import estilos from './Login.module.css';



// pegar do backend
const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe o seu usuario')
        .max(255, 'Informe no maximo 30 caracteres'),
    password: z.string()
        .min (1, 'Informe as menos um caractere')
        .max (2, 'Informe no maximo de 15 caractere'),
});

export function Login(){
    // registra todas as infomações que são dadas pelo usuario e tenta resolver de acordo com o schema
    const{
        register,
        handleSubmit,
        formState: {errors}
    }=useForm(
        {resolver: zodResolver(schemaLogin)}
);
// ver o que esta sendo resgatado
async function ObterDados(data) {
    console.log(`Dados ${data}`)

    try{
        const response = await axios.post('http://127.0.0.1:800/api/login/', {
            username: data.username,
            password: data.password
        });
        const {access, refresh, user} = response.data;

        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        localStorage.setItem('tipo', user.tipo)
        localStorage.setItem('usermane', username)

        console.log("Login efetuado com sucesso")
        alert("Login efetuado com sucesso")
    }catch(error){
        console.error('deu ruim', error)
        alert("dados invalidos")
    }
}

    return(
        <div className={estilos.container}>
            <form onSubmit={handleSubmit(ObterDados)} className={estilos.loginForm}>
                <h2 className={estilos.titulo}>Login</h2>

                <label className={estilos.label}>Usuario</label>
                {/* registrar o que o usuario fez input no usermane */}
                <input className={estilos.inputField} 
                    {...register('username')}
                    // exemplo do preenchimento
                    placeholder='exemplo: luanaGrandi'
                />
                {/* se houver erro no username, pegar a mensagem de erro lá emcima */}
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}


                <label className={estilos.label}>Senha:</label>
                <input className={estilos.inputField} 
                    {...register('password')}
                    placeholder='Senha'
                    type="password"
                />
                {/* se houver algum erro no password, pegar a mensagem de erro lá emcima */}
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                <button type='submit' className={estilos.submitButton}>Entrar</button>
            </form>
        </div>
    )
}

