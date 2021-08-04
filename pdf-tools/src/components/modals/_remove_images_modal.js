import {React, Component} from 'react';
import DFFSB from '../deleteFileFromServerBtn';
import Card from "../features-card/card";
import Request from '../request';
import Pmodal from './_pdf_process_modal';
import Globals from '../globals';


export default class ENCPDFMODAL extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  remove_images(e) {
    this.props.funcs.setState(true);

    let request = new Request("post", "/remove_images", {
      "pdf_file":document.querySelector("#pdfInput").files[0],
      "password":document.querySelector("#encryptPasswordInput").value,
    });

    let obj = this;
    let mypmodal = new Pmodal({ 
    funcs:obj.props.funcs,
    request:request,
    processText:"Removing images...",
    processContent:"Please wait while we are removing all images from your file.", 
    onCompleteText:"Images removed!",
    });
    mypmodal.init().then(result => {
      mypmodal.setContent(
      <>
        <a href={Globals.url(`/${result.responseText}`)} className="btn-large theme-bg waves-effect waves-light">
        Download pdf</a>
        <DFFSB result={result} pmodal={mypmodal} />
      </>)
    });    
  }
  
  render(){
    return (
    <>
    <a style={{ "cursor": "pointer" }} className="feature" onClick={e => this.remove_images(e)}><div>
  <Card icon="broken_image" heading="Remove images" text="This feature allows you to remove images from your pdf file easialy!" />
</div></a>
    
    </>
  )
  }
};