import estilos from './Cabecalho.module.css';
import logo from '../assets/logoProf.png';
import sair from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';

export function Cabecalho() {
    // pegar o nome da pessoa que esta logada para aparecer
  const nomeUsuario = localStorage.getItem('nome') || localStorage.getItem('username');
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear(); // limpa os dados do usuário
    navigate('/');   // vai para a tela de login
  }

  return (
    <header className={estilos.container}>
      <img className={estilos.imgLogo} src={logo} alt="Logo Prof Conecta" />
      
      {/* o nome ir para o cabeçalho */}
      {nomeUsuario && (
        <div className={estilos.usuarioSaudacao}>
          Olá, {nomeUsuario}
        </div>
      )}
    
      {/* icone de sair  */}
      <div className={estilos.sair} onClick={handleLogout}>
        <p>Sair</p>
        <img src={sair} alt="icone de sair" />
      </div>
    </header>
  );
}
