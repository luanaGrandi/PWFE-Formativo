import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './Visualizar.module.css';


// aqui o professor, pode ver a sua reserva individual, mostrando os 
// seus campos especificos e necessarios para o professor saber sua reserva
export function ReservaProfessores() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState({});
  const [disciplinas, setDisciplinas] = useState({});

  const username = localStorage.getItem('username');

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/salas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const salasNome = {};
      res.data.forEach(sala => {
        salasNome[sala.id] = sala.nome;
      });
      setSalas(salasNome);
    })
    .catch(err => console.error('Erro ao buscar salas', err));

    axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const disciplinasMap = {};
      res.data.forEach(disc => {
        disciplinasMap[disc.id] = disc.nome;
      });
      setDisciplinas(disciplinasMap);
    })
    .catch(err => console.error('Erro ao buscar disciplinas', err));

    axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setReservas(res.data);
    })
    .catch(err => console.error('Erro ao buscar reservas', err));
  }, []);

  function periodoDisplay(periodo) {
    const periodos = {
      M: 'Manhã',
      T: 'Tarde',
      N: 'Noite'
    };
    return periodos[periodo] || periodo;
  }

  return (
    <div className={estilos.containerCard}>
      <h2 className={estilos.tituloCard}>Minhas Reservas</h2>
      <div className={estilos.listaCard}>
        {reservas.map(reserva => {
          // Pega o nome da sala de forma segura
          const nomeSala =
            reserva.sala_reservada_detail?.nome ||
            salas[reserva.sala_reservada] ||
            reserva.sala_reservada;

          return (
            <div key={reserva.id} className={estilos.card}>
              <h3 className={estilos.nome}>Sala: {nomeSala}</h3>
              <p><strong>Professor: </strong>{username}</p>
              <p><strong>Disciplina: </strong>{disciplinas[reserva.disciplina]}</p>
              <p><strong>Período: </strong>{periodoDisplay(reserva.periodo)}</p>
              <p><strong>Data Início: </strong>{reserva.data_inicio}</p>
              <p><strong>Data Término: </strong>{reserva.data_termino}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
