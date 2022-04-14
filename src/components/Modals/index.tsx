import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalModal = withReactContent(Swal);

/**
 * Modal de confirmação com botões 'Sim' e 'Não'
 * @param icone Valor no tipo SweetAlertIcon
 * @param titulo Valor no tipo string
 * @param mensagem Valor no tipo string
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalConfirmacao(icone: SweetAlertIcon, titulo: string, mensagem: string) {
  return SwalModal.fire({
    icon: icone,
    title: titulo,
    html: mensagem,
    buttonsStyling: false,
    confirmButtonText: 'Sim',
    showCancelButton: true,
    cancelButtonText: 'Não',
    customClass: {
      confirmButton: 'btn btn-primary me-1',
      cancelButton: 'btn btn-danger',
    },
  });
}

/**
 * Modal de mensagem
 * @param icone Valor no tipo SweetAlertIcon
 * @param titulo Valor no tipo string
 * @param mensagem Valor no tipo string
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalMensagem(icone: SweetAlertIcon, titulo: string, mensagem: string) {
  return SwalModal.fire({
    icon: icone,
    title: titulo,
    html: mensagem,
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: { confirmButton: 'btn btn-primary' },
  });
}

/**
 * Modal de erro dados não carregados
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
 export function ModalErroDadosNaoCarregados() {
  return ModalMensagem("error", "Erro", "Dados não foram carregados!");;
}

/**
 * Modal de confirmação de cadastro
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalSucessoCadastro() {
  return ModalMensagem("success", "Salvo", "Cadastro realizado com sucesso!");
}

/**
 * Modal de erro de cadastro
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalErroCadastro() {
  return ModalMensagem("error", "Erro", "Cadastro não pode ser realizado!");
}
