import { ErrorMessage, Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Col, InputGroup, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";

interface CampoListaProps {
  ingredientes: {
    nome: string;
  }[];
  field_array_name: string;
  titulo: string;
  botao_adicionar_label: string;
}

/**
 * Arrumar
 */
export function CampoLista(props: CampoListaProps) {
  return (
    <Col md={12} className="d-flex flex-column pt-3 pb-3 mt-3 mb-3 border-dark border-top border-bottom">
      <FieldArray name={props.field_array_name}>
        {({ insert, remove, push }) => (
          <Row>
            <Col md={12} className="d-flex flex-row justify-content-between pb-1">
              <Titulo tag="h6" className="fw-normal">{props.titulo}</Titulo>
              <Botao
                type="button"
                color="info"
                onClick={() => push({ nome: '' })}
                className="d-flex flex-row justify-content-center align-items-center"
              >
                <span className="me-2">{props.botao_adicionar_label}</span>
                <GrAddCircle size={25} className="m-0 p-0" />
              </Botao>
            </Col>
            {props.ingredientes.length > 0 &&
              props.ingredientes.map((ingrediente, index) => (
                <Col md={6} key={index} className="p-2">
                  <Row>
                    <Col md={12}>
                      <InputGroup>
                        <Field
                          name={`ingredientes.${index}.nome`}
                          placeholder="Ingrediente"
                          type="text"
                          className="form-control"
                        />
                        <Botao
                          type="button"
                          color="danger"
                          className="d-flex justify-content-center align-items-center"
                          onClick={() => remove(index)}
                        >
                          <AiOutlineClose size={20} />
                        </Botao>
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      <ErrorMessage
                        name={`ingredientes.${index}.nome`}
                        component="div"
                        className="field-error"
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        )}
      </FieldArray>
    </Col>
  );
}

/*
  import { ListGroupItem } from "reactstrap";
  import { MdPlayArrow } from "react-icons/md";
  import { Titulo } from "../../Titulo";

  interface IngredientesTypes {
    nome: string;
  }

  interface IngredientesListaProps {
    data: IngredientesTypes[];
  }

  export function IngredientesLista(props: IngredientesListaProps) {
    return (
      <ListGroupItem className="d-flex flex-column">
        <Titulo tag="h5" className="w-100">Ingredientes</Titulo>
        {props.data.map((item, index) => {
          return (
            <ItemListaIngredientes data={item.nome} key={index} />
          );
        })}
      </ListGroupItem>
    );
  }

  interface ItemListaIngredientesProps {
    data: string;
  }

  function ItemListaIngredientes(props: ItemListaIngredientesProps) {
    return (
      <div className="d-flex flex-row justify-content-between">
        <MdPlayArrow size={25} className="me-1" />
        <Titulo tag="h6" className="w-100">{props.data}</Titulo>
      </div>
    );
  }
*/