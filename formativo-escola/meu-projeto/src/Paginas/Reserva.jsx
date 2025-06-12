import axios from "axios";
import React, { useState, useEffect } from "react";
import add from '../assets/add.png';
import excluir from '../assets/excluir.png';
import editar from '../assets/editar.png';
import estilos from './Visualizar.module.css';
import { Link } from 'react-router-dom';

export function Reserva() {
    const [reservas, setReservas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState({}); // opcional para exibir nome da sala

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        // Buscar disciplinas (para exibir nome, se necessário)
        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => setDisciplinas(response.data))
        .catch(error => console.error("Erro ao buscar disciplinas: ", error));

        // Buscar professores
        axios.get('http://127.0.0.1:8000/api/usuario/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const professorPorId = {};
            response.data.forEach(prof => {
                professorPorId[prof.id] = `${prof.username}`;
            });
            setProfessores(professorPorId);
        })
        .catch(error => console.error("Erro ao buscar professores", error));

        // Buscar reservas de ambientes
        axios.get('http://127.0.0.1:8000/api/reservas/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => setReservas(response.data))
        .catch(error => console.error("Erro ao buscar reservas", error));
    }, []);

    // Exibir o nome do período de forma legível
    function periodoDisplay(periodo) {
        switch (periodo) {
            case 'M': return 'Manhã';
            case 'T': return 'Tarde';
            case 'N': return 'Noite';
            default: return periodo;
        }
    }

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            alert('Reserva excluída com sucesso!');
            setReservas(prev => prev.filter(res => res.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir reserva:', error);
            alert('Erro ao excluir a reserva.');
        });
    };

    return (
        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Reservas de Ambientes</h3>
            <Link to="reservaCad" className={estilos.topoAcoes}>
                <img className={estilos.iconeAdd} src={add} alt="adicionar reserva" />
            </Link>
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            <th>Professor</th>
                            <th>Disciplina</th>
                            <th>Sala</th>
                            <th>Período</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{professores[reserva.professor] || reserva.professor}</td>
                                <td>
                                    {
                                        disciplinas.find(d => d.id === reserva.disciplina)?.nome
                                        || reserva.disciplina
                                    }
                                </td>
                                <td>{reserva.sala_reservada}</td>
                                <td>{periodoDisplay(reserva.periodo)}</td>
                                <td>{reserva.data_inicio}</td>
                                <td>{reserva.data_termino}</td>
                                <td>
                                    <Link to={`/inicial/reserva/editar/${reserva.id}`}>
                                        <img className={estilos.icone} src={editar} alt="editar" />
                                    </Link>
                                    <img
                                        className={estilos.icone}
                                        src={excluir}
                                        onClick={() => handleDelete(reserva.id)}
                                        alt="excluir"
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
