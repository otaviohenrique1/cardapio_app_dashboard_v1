import { FormGroup, Label } from "reactstrap";

interface CampoDropzone2Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  imagem: File[];
}

export function CampoDropzone2(props: CampoDropzone2Props) {
  return (
    <FormGroup>
      <Label htmlFor="imagens">imagens upload</Label>
      <input id="imagens" name="imagens" type="file" onChange={(event) => {
        props.setFieldValue("imagens", event.currentTarget.files![0]);
      }} className="form-control" />
      {/* <p>{props.imagem.name}</p> */}
    </FormGroup>
  );
}

