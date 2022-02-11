import { Col, Container, Row, Table } from "reactstrap";
import { getDate, getDay, getMonth, getYear,  } from "date-fns";

export function Calendario() {
  let date = new Date();
  let dia = getDate(date);
  let mes = getMonth(date);
  let ano = getYear(date);

  const dias_da_semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const meses_do_ano = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // let Calendario = '';
  
  return (
    <Container>
      <Row>
        <Col md={12}>
          <ul>
            <li>{`${dias_da_semana[getDay(date)]}`}</li>
            <li>{`${meses_do_ano[getMonth(date)]}`}</li>
            <li>{`dia => ${dia}`}</li>
            <li>{`mes => ${mes + 1}`}</li>
            <li>{`ano => ${ano}`}</li>
          </ul>
        </Col>
        <Col md={12}>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan={7}>{`${meses_do_ano[mes]} - ${ano}`}</th>
              </tr>
              <tr>
                {dias_da_semana.map((item, index) => {
                  return (
                    <th key={index}>{item}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}