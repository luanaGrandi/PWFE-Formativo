import axios from "axios";
import React, {useState, useEffect} from "react";
import add from '../assets/add.png';
import excluir from '../assets/excluir.png';
import editar from '../assets/editar.png';
import estilos from './Visualizar.module.css'
import { Link } from 'react-router-dom';

export function Disciplina(){
    const[disciplinas, setDisciplinas] = useState([]);
    const[professores, setprofessores] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        // se der certo, pegar as disciplinas. popular a minha variavel disciplina
        //com o dados da API
        .then(response =>{
            setDisciplinas(response.data);
        })
        // se der ruim
        .catch(error =>{
            console.error("Erro: ", error);
        });

        // busca dos professores
        axios.get('http://127.0.0.1:8000/api/usuario/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            const professorPorId = {}
            response.data.forEach(prof => {
                professorPorId[prof.id] = `${prof.username}`;
                // professorPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setprofessores(professorPorId);
        })
        // se der ruim
        .catch(error => {
            console.error("Erro ao buscar o professor", error);
        });
    },[])


    //Função de exclusão da Disciplina
        const handleDelete = (id) => {
            const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
            if (!confirmar) return;

            const token = localStorage.getItem('access_token');

            axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('Disciplina excluída com sucesso!');
                setDisciplinas(prev => prev.filter(dis => dis.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir disciplina:', error);
                alert('Erro ao excluir a disciplina.');
            });
            };

    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Disciplinas</h3>
            <Link to="disCad" className={estilos.topoAcoes}>
                <img className={estilos.iconeAdd} src={add} alt="adicionar disciplinas" />
            </Link>
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* th -> titulo da coluna */}
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Descrição</th>
                            <th>Carga Horária</th>
                            <th>Professor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map(Disciplina =>(
                            <tr key={Disciplina.id}>
                                <td>{Disciplina.nome}</td>
                                <td>{Disciplina.curso}</td>
                                <td>{Disciplina.descricao}</td>
                                <td>{Disciplina.carga_horaria}</td>
                                <td>{professores[Disciplina.professor]}</td>
                                <td>
                                    {/* editar a disciplina */}
                                    <Link to={`/inicial/disciplina/editar/${Disciplina.id}`}>
                                        <img className={estilos.icone} src={editar} />
                                    </Link>
                                   
                                    <img className={estilos.icone} src={excluir}
                                    onClick={() => handleDelete(Disciplina.id)}/> 
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </main>
    )
}