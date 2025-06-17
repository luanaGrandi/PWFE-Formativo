import axios from "axios";
import React, { useState, useEffect } from "react";
import add from '../assets/add.png';
import excluir from '../assets/excluir.png';
import editar from '../assets/editar.png';
import estilos from './Visualizar.module.css';
import { Link } from 'react-router-dom';

export function Salas() {
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/salas/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => setSalas(response.data))
        .catch(error => console.error("Erro ao buscar salas:", error));
    }, []);

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta sala?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/salas/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            alert('Sala excluída com sucesso!');
            setSalas(prev => prev.filter(sala => sala.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir sala:', error);
            alert('Erro ao excluir a sala.');
        });
    };

    return (
        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Salas Cadastradas</h3>
            
            <Link to="salaCad" className={estilos.topoAcoes}>
                <img className={estilos.iconeAdd} src={add} alt="adicionar sala" />
            </Link>

            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            <th>Nome da Sala</th>
                            <th>Capacidade de Alunos</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salas.map(sala => (
                            <tr key={sala.id}>
                                <td>{sala.nome}</td>
                                <td>{sala.capacidade_alunos}</td>
                                <td>
                                    <Link to={`/inicial/salas/editar/${sala.id}`}>
                                        <img className={estilos.icone} src={editar} alt="editar sala" />
                                    </Link>
                                    <img
                                        className={estilos.icone}
                                        src={excluir}
                                        alt="excluir sala"
                                        onClick={() => handleDelete(sala.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
