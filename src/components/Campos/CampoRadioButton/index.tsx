import { Field } from "formik";
import { ReactNode } from "react";
import { Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { Titulo } from "../../Titulo";
import { CampoErro } from "../CampoErro";

export interface RadioButtonDataTypes {
  radio_label: string | ReactNode;
  radio_name: string;
  radio_value: string;
  radio_id: string;
}

export interface CampoRadioButtonProps {
  radio_list: RadioButtonDataTypes[];
}

export function CampoRadioButton(props: CampoRadioButtonProps) {
  const { radio_list } = props;

  return (
    <div className="d-flex flex-row">
      {radio_list.map((item, index) => {
        const { radio_label, radio_id, radio_name, radio_value } = item;
        return (
          <div className="form-check" key={index}>
            <Field type="radio" name={radio_name} value={radio_value} className="form-check-input" id={radio_id} />
            <label className="form-check-label" htmlFor={radio_id}>{radio_label}</label>
          </div>
        );
      })}
    </div>
  );
}

export interface CampoRadioButtonComErroProps {
  md: ColumnProps;
  radio_list: RadioButtonDataTypes[];
  titulo: string;
  error?: any;
  touched?: any;
}

export function CampoRadioButtonComErro(props: CampoRadioButtonComErroProps) {
  const { md, radio_list, titulo, error, touched } = props;
  return (
    <Col md={md} className="d-flex flex-column border-bottom border-dark">
      <Titulo tag="h6" className="fw-normal">{titulo}</Titulo>
      <CampoRadioButton radio_list={radio_list} />
      <CampoErro error={error} touched={touched} />
    </Col>
  );
}

// export function CampoRadioButton2(props: CampoRadioButtonProps) {
//   const { radio_list } = props;

//   return (
//     <div role="group" aria-labelledby="my-radio-group" className="form-check">
//       {radio_list.map((item, index) => {
//         const { radio_label, radio_id, radio_name, radio_value } = item;
//         return (
//           <label className="form-check-label" htmlFor={radio_id} key={index}>
//             <Field type="radio" name={radio_name} value={radio_value} className="form-check-input" id={radio_id} />
//             {radio_label}
//           </label>
//         );
//       })}
//     </div>
//   );
// }

/* Exemplo RadioButton no Formik:
  <div role="group" aria-labelledby="my-radio-group">
    <label>
      <Field type="radio" name="picked" value="One" />
      One
    </label>
    <label>
      <Field type="radio" name="picked" value="Two" />
      Two
    </label>
  </div>
*/
