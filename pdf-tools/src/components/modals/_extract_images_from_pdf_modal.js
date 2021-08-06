import {React, Component} from 'react';
import Card from "../features-card/card";
import Request from '../request';
import Pmodal from './_pdf_process_modal';
import Globals from '../globals';


export default class ENCPDFMODAL extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  extract_images(e) {
    this.props.funcs.setState(true);

    let request = new Request("post", "/extract_images", {
      "pdf_file":document.querySelector("#pdfInput").files[0],
    });

    let obj = this;
    let mypmodal = new Pmodal({ 
    funcs:obj.props.funcs,
    request:request,
    processText:"Extracting images...",
    processContent:"Please wait while we are extracting images from your pdf.", 
    onCompleteText:"Images extracted successfully!",
    });
    mypmodal.init().then(result => {
      const imagesList = JSON.parse(result.responseText)
      mypmodal.setContent(
      <>
        <div style={{"display":"flex", "flexDirection":"column", "rowGap":"2rem"}}>
          <h5>Total {imagesList.length} images found!</h5>
          <div style={{"display":"flex", "flexWrap":"wrap", "gap":"2rem"}}>
            {JSON.parse(result.responseText).map(i => {
            const imageSource = Globals.url("/static/PdfFiles/" + document.querySelector("#selectedPdfName").innerText.replace(".pdf", "") + "/" + i);
            return <a href={imageSource}><div className="extractedImagePreview" style={{"backgroundImage":`url("${imageSource}")`}}></div></a>
          })}
          </div>
        </div>
      </>);
    });    
  }
  
  render(){
    return (
    <>
    <a style={{ "cursor": "pointer" }} className="feature" onClick={e => this.extract_images(e)}><div>
  <Card icon="all_out" heading="Extract Images" text="This feature allows you to extract images from your pdf!" />
</div></a>
    
    </>
  )
  }
};