import { Nav, Navbar, NavItem, Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavbarToggler, Dropdown } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface UsuarioLogadoDataTypes {
  id_usuario: string;
  nome: string;
}

interface HeaderAppProps {
  data_usuario_logado?: UsuarioLogadoDataTypes;
}

const dadosIniciais: UsuarioLogadoDataTypes = {
  id_usuario: '',
  nome: ''
};

export function HeaderApp(props: HeaderAppProps) {
  const [data, setData] = useState<UsuarioLogadoDataTypes>(dadosIniciais);

  useEffect(() => {
    if (props.data_usuario_logado) {
      setData(props.data_usuario_logado);
    }
    setData({
      id_usuario: 'id_usuario',
      nome: 'nome_usuario'
    });
  }, [props.data_usuario_logado]);

  const [aberto, setAberto] = useState<boolean>(false);
  const toggle = () => {
    setAberto(!aberto)
  };

  const [dropdownAberto, setDropdownAberto] = useState<boolean>(false);
  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto)
  };

  return (
    <Navbar color="dark" dark expand="sm" light className="rounded-top">
      <NavbarBrand>
        <MdMenuBook size={30} />
        <span className="fw-bold ms-2">Chat App</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={aberto}>
        <Nav className="me-auto d-flex justify-content-between w-100" navbar>
          <NavItem>
            <Link to="/home" className="nav-link">Inicio</Link>
          </NavItem>
          <Dropdown toggle={toggleDropdown} isOpen={dropdownAberto}>
            <DropdownToggle caret className="d-flex flex-row justify-content-center align-items-center">
              <h6 className="m-0">{(data.nome) ? data.nome : '[Nome do usuario]'}</h6>
              <BiUserCircle size={30} className="ms-2" />
            </DropdownToggle>
            <DropdownMenu dark>
              <DropdownItem>
                Perfil
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}