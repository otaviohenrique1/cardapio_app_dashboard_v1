import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavItem, Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavbarToggler, Dropdown } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { ModalConfirmacao, ModalConfirmacaoProps } from "../Modals";
import { Titulo } from "../Titulo";

interface HeaderAppProps {
  data_usuario_logado: UsuarioLogadoTypes;
}

export function HeaderApp(props: HeaderAppProps) {
  const { data_usuario_logado } = props;

  const [aberto, setAberto] = useState<boolean>(false);
  const toggle = () => {
    setAberto(!aberto)
  };

  return (
    <Navbar color="dark" dark expand="sm" light>
      <NavbarBrand tag='div'>
        <Link to="/home" className="nav-link d-flex flex-row">
          <MdMenuBook size={30} color="white" />
          <span className="fw-bold ms-2 text-white">Cardapio</span>
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={aberto}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/home" className="nav-link">Inicio</Link>
          </NavItem>
        </Nav>
        <DropdownHeader data_usuario_logado={data_usuario_logado} />
      </Collapse>
    </Navbar>
  );
}

interface DropdownHeaderProps {
  data_usuario_logado: UsuarioLogadoTypes;
}

function DropdownHeader(props: DropdownHeaderProps) {
  const { id, nome } = props.data_usuario_logado;

  const navigate = useNavigate();

  const [dropdownAberto, setDropdownAberto] = useState<boolean>(false);
  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto)
  };

  function logout() {
    const data_modal: ModalConfirmacaoProps = {
      icone: "warning",
      titulo: "Aviso",
      mensagem: "Deseja sair?"
    };
  
    ModalConfirmacao(data_modal)
      .then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Dropdown toggle={toggleDropdown} isOpen={dropdownAberto}>
      <DropdownToggle caret className="d-flex flex-row justify-content-center align-items-center">
        <Titulo tag="h6" className="m-0">{nome}</Titulo>
        <BiUserCircle size={30} className="ms-2" />
      </DropdownToggle>
      <DropdownMenu dark>
        <DropdownItem>
          <Link
            to={`/empresa/${id}`}
            className="dropdown-item w-100 text-center"
          >Perfil</Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          className="w-100 text-center"
          onClick={logout}
        >Sair</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
