import axios from "axios";
import React, {useState, useEffect} from "react";
import add from '../assets/add.png';
import excluir from '../assets/excluir.png';
import editar from '../assets/editar.png';
import estilos from './Visualizar.module.css'
import { Link } from 'react-router-dom';


export function Professores(){
    const [professores, setProfessores] = useState([])
 
    useEffect(()=>{
 
        const token = localStorage.getItem('access_token')
        console.log(token)
 
        axios.get('http://127.0.0.1:8000/api/usuario', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response=>{
                const profs = response.data.filter((user) => user.tipo ==='P');
                // console.log(response.data)
                setProfessores(profs);
                
                // setProfessores(response.data)
            })
            .catch(error =>{
                console.log("error:", error)
            })
    },[])
 
   
        const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Registro excluído com sucesso!');
            setProfessores(prev => prev.filter(pro => pro.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir o professor:', error);
            alert('Erro ao excluir o professor.');
        });
        };
 
  return (
    <main className={estilos.container}>
        <h3 className={estilos.titulo}>Professores</h3>
       <div className={estilos.topoAcoes}>
          <Link to="profCadastrar" className={estilos.botaoAdicionar}>
                <img src={add} alt="Adicionar" className={estilos.iconeAdd} />        
          </Link>
        </div>
         <div className={estilos.tabelaWrapper}>
          <table className={estilos.tabeladados}>
            <thead>
                <tr>              
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Usuário</th>
                        <th>ni</th>
                        <th>Data de contratacao</th>
                        <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                    {professores.map(professor => (
                        <tr key={professor.id}>                          
                            <td>{professor.first_name}</td>
                            <td>{professor.last_name}</td>
                            <td>{professor.username}</td>
                            <td>{professor.ni}</td>
                            <td>{professor.data_contratacao}</td>
                           <td className={estilos.acoes}>
                    {/* Passo para o "param" o id do item que posso editar e excluir */}
                   <Link to={`/inicial/professores/editar/${professor.id}`}>
                      <img src={editar} className={estilos.icone}/>
                    </Link>
                    <img src={excluir} alt="Excluir" className={estilos.icone}
                      onClick={() => handleDelete(professor.id)}/>                                  
                  </td>
                        </tr>
                    ))}
                </tbody>
          </table>
        </div>          
        </main>
   
  );
}
 