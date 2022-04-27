import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalModal = withReactContent(Swal);

export interface ModalImagemProps {
  image_url: string;
  image_height: string | number;
  image_alt: string;
}

/**
 * Modal de exibição de imagem
 * @param data Valor no tipo ModalImagemProps
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalImagem(data: ModalImagemProps) {
  const { image_url, image_height, image_alt } = data;
  return SwalModal.fire({
    imageUrl: image_url,
    imageHeight: image_height,
    imageAlt: image_alt,
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: {
      confirmButton: 'btn btn-primary',
      image: 'img-fluid'
    }
  })
}

export interface ModalConfirmacaoProps {
  icone: SweetAlertIcon;
  titulo: string;
  mensagem: string;
}

/**
 * Modal de confirmação com botões 'Sim' e 'Não'
 * @param data Valor no tipo ModalConfirmacaoProps
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalConfirmacao(data: ModalConfirmacaoProps) {
  const { icone, titulo, mensagem } = data;

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

export interface ModalMensagemProps {
  icone: SweetAlertIcon;
  titulo: string;
  mensagem: string;
}

/**
 * Modal de mensagem
 * @param data Valor no tipo ModalMensagemProps
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalMensagem(data: ModalMensagemProps) {
  const { icone, titulo, mensagem } = data;

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
  const data_modal: ModalMensagemProps = {
    icone: "error",
    titulo: "Erro",
    mensagem: "Dados não foram carregados!"
  };

  return ModalMensagem(data_modal);
}

/**
 * Modal de confirmação de cadastro
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalSucessoCadastro() {
  const data_modal: ModalMensagemProps = {
    icone: "success",
    titulo: "Salvo",
    mensagem: "Cadastro realizado com sucesso!"
  };

  return ModalMensagem(data_modal);
}

/**
 * Modal de erro de cadastro
 * @returns Modal SwalModal: typeof Swal & ReactSweetAlert
 */
export function ModalErroCadastro() {
  const data_modal: ModalMensagemProps = {
    icone: "error",
    titulo: "Erro",
    mensagem: "Cadastro não pode ser realizado!"
  };

  return ModalMensagem(data_modal);
}
