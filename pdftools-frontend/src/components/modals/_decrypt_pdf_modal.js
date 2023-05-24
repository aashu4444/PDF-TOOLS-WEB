import { React, useState } from 'react';
import { Modal, Button } from 'react-materialize';
import Card from "../features-card/card";
import Request from '../request';
import Pmodal from './_pdf_process_modal';
import Globals from '../globals';
import DFFSB from '../deleteFileFromServerBtn';


export default function DecryptPdfModal(props) {
  const [ModalOpen, setModalOpen] = useState(false);
  function decrypt() {
    setModalOpen(false);
    props.funcs.setState(true);

    let request = new Request("post", "/decrypt_pdf", {
      "pdf_file": document.querySelector("#pdfInput").files[0],
      "password": document.querySelector("#decryptPasswordInput").value,
    });

    let mypmodal = new Pmodal({
      funcs: props.funcs,
      request: request,
      processText: "Decrypting...",
      processContent: "Your pdf is being decrypted please wait.",
      onCompleteText: "Decryption successfull!",
    });
    mypmodal.init().then(result => {
      mypmodal.setContent(
        <>
          <a href={Globals.url(`/${result.responseText}`)} className="btn-large theme-bg waves-effect waves-light">
            Download decrypted pdf</a>
          <DFFSB result={result} pmodal={mypmodal} />
        </>)
    });
  }

  return (
    <>
      <Modal open={ModalOpen} actions={[
        <Button modal="close" node="button" waves="light" className="theme-bg">Close</Button>,
        <Button modal="close" onClick={decrypt} node="button" waves="light" className="theme-bg" style={{ "margin": "0 1rem" }}>Decrypt</Button>,
      ]}>
        <h4 className="theme-color modalHeading" style={{ "display": "flex" }}>Decrypt PDF</h4>
        <div className="input-field col s6" style={{ "margin": "3rem 0" }}>
          <input id="decryptPasswordInput" type="password" className="theme-color" />
          <label htmlFor="decryptPasswordInput" style={{ "left": "0" }}>Enter pdf password.</label>
        </div>
      </Modal>

      <span style={{ "cursor": "pointer" }} onClick={e => setModalOpen(true)} className="feature"><div>
        <Card icon="no_encryption" heading="Decrypt PDF" text="Remove password from your pdf files easialy just in seconds!" />
      </div></span>
    </>
  )
};