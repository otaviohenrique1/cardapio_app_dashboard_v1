import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const SwalModal = withReactContent(Swal);

export function ModalConfirmacaoCadastro() {
  return SwalModal.fire({
    icon: 'success',
    title: "Cadastro realizado com sucesso!",
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  });
}

export function ModalErroCadastro(erro: any) {
  return SwalModal.fire({
    icon: 'error',
    title: "Erro!",
    html: <p>{`${erro}`}</p>,
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  });
}