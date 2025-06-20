import estilos from './Cabecalho.module.css';
import logo from '../assets/logoProf.png';
import sair from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';

export function Cabecalho() {
  const nomeUsuario = localStorage.getItem('nome') || localStorage.getItem('username');
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  function handleLogoClick() {
    navigate('/inicial');  // Vai para a página inicial
  }

  return (
    <header className={estilos.container}>
      {/* Coloque onClick na logo */}
      <img
        className={estilos.imgLogo}
        src={logo}
        alt="Logo Prof Conecta"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}  // muda o cursor para indicar que é clicável
      />

      {nomeUsuario && (
        <div className={estilos.usuarioSaudacao}>
          Olá, {nomeUsuario}
        </div>
      )}

      <div className={estilos.sair} onClick={handleLogout}>
        <p>Sair</p>
        <img src={sair} alt="icone de sair" />
      </div>
    </header>
  );
}
