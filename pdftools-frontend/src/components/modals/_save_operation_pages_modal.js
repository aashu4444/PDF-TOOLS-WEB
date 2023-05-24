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
  remove_links(e) {
    this.props.funcs.setState(true);

    let request = new Request("post", "/remove_links", {
      "pdf_file":document.querySelector("#pdfInput").files[0],
      "password":document.querySelector("#encryptPasswordInput").value,
    });

    let obj = this;
    let mypmodal = new Pmodal({ 
    funcs:obj.props.funcs,
    request:request,
    processText:"Saving operation pages...",
    processContent:"Please wait while we are saving your operation pages in a pdf file.", 
    onCompleteText:"Pages saved",
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
    <a className="feature" style={{ "cursor": "pointer" }} onClick={e => this.remove_links(e)}><div>
  <Card icon="call_split" heading="Save operation pages" text="This feature allows you to save operation pages in a pdf file. You can use this feature to split pages from your pdf." />
</div></a>
    
    </>
  )
  }
};