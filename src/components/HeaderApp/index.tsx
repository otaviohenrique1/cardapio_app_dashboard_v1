import { Nav, Navbar, NavItem, Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavbarToggler, Dropdown } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalModal = withReactContent(Swal);

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
  const navigate = useNavigate();

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

  function logout() {
    SwalModal.fire({
      title: "Deseja sair?",
      buttonsStyling: false,
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
      customClass: {
        confirmButton: 'btn btn-primary me-1',
        cancelButton: 'btn btn-danger',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }

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
              <DropdownItem>Perfil</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logout}>Sair</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}