import {React, Component} from 'react';
import { Modal, Button } from 'react-materialize';
import Card from "../features-card/card";
import Request from '../request';
import Pmodal from './_pdf_process_modal';
import Globals from '../globals';
import DFFSB from '../deleteFileFromServerBtn';


export default class ENCPDFMODAL extends Component {
  constructor(props){
    super(props);
    this.state = {
      ModalOpen: false,
    }
  }
  encrypt(e) {
    this.setState({ModalOpen: false})
    this.props.funcs.setState(true);

    let request = new Request("post", "/encrypt_pdf", {
      "pdf_file":document.querySelector("#pdfInput").files[0],
      "password":document.querySelector("#encryptPasswordInput").value,
    });

    let obj = this;
    let mypmodal = new Pmodal({ 
    funcs:obj.props.funcs,
    request:request,
    processText:"Encrypting...",
    processContent:"Your pdf is being encrypted please wait.", 
    onCompleteText:"Encryption successfull!",
    });
    mypmodal.init().then(result => {
      mypmodal.setContent(
      <>
        <a href={Globals.url(`/${result.responseText}`)} className="btn-large theme-bg waves-effect waves-light">
        Download encrypted pdf</a>
        <DFFSB result={result} pmodal={mypmodal} />
      </>);
    });    
  }
  
  render(){
    return (
    <>
    <Modal
     open={this.state.ModalOpen} 
    actions={[
      <Button modal="close" node="button" waves="light" className="theme-bg disable">Close</Button>,
      <Button modal="close" node="button" waves="light" id="submitBtn" className="theme-bg disable" style={{ "margin": "0 1rem" }} onClick={e => this.encrypt(e)}>Encrypt</Button>
    ]}>
      <h4 className="theme-color modalHeading" style={{ "display": "flex" }}>Encrypt PDF</h4>
      <span className="replaceTarget">
        <div className="input-field col s6 removeItem" style={{ "margin": "3rem 0" }}>
          <input id="encryptPasswordInput" type="password" className="theme-color" />
          <label htmlFor="encryptPasswordInput" style={{ "left": "0" }}>Enter password to set.</label>
      
        </div>
      </span>
    </Modal>

      <span style={{ "cursor": "pointer" }} onClick={e => this.setState({ModalOpen:true})} className="feature"><div>
    <Card icon="enhanced_encryption" heading="Encrypt PDF" text="Set password on your pdf files easialy just in seconds!" />
  </div></span>
    
    </>
  )
  }
};