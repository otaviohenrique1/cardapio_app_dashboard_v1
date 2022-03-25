import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Titulo } from '../Titulo';

export function Dropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <ListGroupItem key={file.name}>
      {file.name} - {file.size} bytes
    </ListGroupItem>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <Input {...getInputProps()} />
        <p>Arraste arquivos aqui, ou click aqui para selecionar os arquivos</p>
      </div>
      <aside>
        <Titulo tag='h5' >Arquivos</Titulo>
        <ListGroup>{files}</ListGroup>
      </aside>
    </section>
  );
}

export function Dropzone3() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <Container className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <Input {...getInputProps()} />
        <p>Arraste arquivos aqui, ou click aqui para selecionar os arquivos</p>
      </div>
      <aside>
        <Titulo tag='h5' >Arquivos</Titulo>
        <ListGroup>
          {acceptedFiles.map(file => (
            <ListGroupItem key={file.name}>
              {file.name} - {file.size} bytes
            </ListGroupItem>
          ))}
        </ListGroup>
      </aside>
    </Container>
  );
}