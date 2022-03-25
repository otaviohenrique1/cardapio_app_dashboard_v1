import React from 'react'
import Dropzone from 'react-dropzone'

export function Dropzone2() {
  return (
    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} maxFiles={1} multiple={false} >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps({ value: '', })} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

