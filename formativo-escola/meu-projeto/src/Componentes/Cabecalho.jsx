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
      {/* apos o usuario clicar na logo, ele voltara para a pagina inicial */}
      <img
        className={estilos.imgLogo}
        src={logo}
        alt="Logo Prof Conecta"
        onClick={handleLogoClick}
      />

      {/* para aparecer o nome do usuario que esta logado */}
      {nomeUsuario && (
        <div className={estilos.usuarioSaudacao}>
          Olá, {nomeUsuario}
        </div>
      )}

      {/* botao para fazer o logout/sair  */}
      <div className={estilos.sair} onClick={handleLogout}>
        <p>Sair</p>
        <img src={sair} alt="icone de sair" />
      </div>
    </header>
  );
}
