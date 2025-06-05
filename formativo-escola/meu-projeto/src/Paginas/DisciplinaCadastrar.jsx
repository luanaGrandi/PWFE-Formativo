import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { axios } from 'axios';
import { useState, useEffect } from 'react';

const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1,'Informe seu nome!')
        .max(100, 'Informe no maximo 100 caracteres'),
    curso: z.string()
        .min(1, 'informe o curso!')
        .max(100, 'Informe no maximo 100 caracteres'),
    carga_horaria: z.ZodNumber(
        {invalid_type_error: 'informe uma carga horaria'})
        .int("digite um valor inteiro")
        .min(1, 'informe um valor')
        .max(260, 'carga horaria maxima de 260h'),
    descricao: z.string()
        .min(1, 'informe a descrição')
        .max(255, ' informe no maximo  255 caracteres'),
    professor: z.string(
        {invalid_type_error: 'selecione um professor!'})
        .min(1, "selecione um professor")
});

export function DisciplinaCadastrar(){
    const [professores, setprofessores] = useState([]);
    const{
        register,
        handleSubmit,
        formstate: {errors},
    } = useForm ({
        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(()=>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                    setprofessores(response.data);
            }catch(error){
                console.error("erro", error);
            } 
        }
        buscarProfessores()
    },[])

    async function obterDadosFormulario(data) {
        console.log("dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso!")
            reset();
        }catch(error){
            console.error("erro", error)
            alert("erro ao cadastrar")
        }
        
    }
}