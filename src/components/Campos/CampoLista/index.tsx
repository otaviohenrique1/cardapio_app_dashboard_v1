import { ErrorMessage, Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Col, InputGroup, Row } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";

interface CampoListaProps {
  md: ColumnProps;
  data_array: any[];
  field_array_name: string;
  item_obj_push: any;
  titulo: string;
  botao_adicionar_label: string;
}

export function CampoLista(props: CampoListaProps) {
  const { md, data_array, field_array_name, item_obj_push, titulo, botao_adicionar_label } = props;

  return (
    <Col md={md} className="d-flex flex-column pt-3 pb-3 mt-3 mb-3 border-dark border-top border-bottom">
      <FieldArray name={field_array_name}>
        {({ remove, push }) => (
          <Row>
            <Col md={12} className="d-flex flex-row justify-content-between pb-1">
              <Titulo tag="h6" className="fw-normal">{titulo}</Titulo>
              <Botao
                type="button"
                color="info"
                onClick={() => push(item_obj_push)}
                className="d-flex flex-row justify-content-center align-items-center"
              >
                <span className="me-2">{botao_adicionar_label}</span>
                <GrAddCircle size={25} className="m-0 p-0" />
              </Botao>
            </Col>
            {data_array.length > 0 &&
              data_array.map((item, index) => (
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
