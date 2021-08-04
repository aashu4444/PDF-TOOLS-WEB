import { React } from 'react';
import Globals from '../globals';

export default class pmodal {
  constructor(props) {
    this.props = props;
  }
  init(add=true) {
    let obj = this;
    return new Promise((resolve, reject) => {

      this.props.funcs.setprocessModalHeading(
        <h4 className="processModalHeading animate">{this.props.processText}</h4>
      );
      this.props.funcs.setProcessModalContent(
        <h6 className="processModalContent" style={{ "margin": "2rem 0" }}>{this.props.processContent}</h6>
      );

      this.props.request.send().then(result => {
        resolve(result);
        if (add){
          Globals.addFile(document.querySelector("#selectedPdfName").innerText, result.responseText);
        }
        obj.result = result;
        this.props.funcs.setprocessModalHeading(
          <h4 className="processModalHeading">{this.props.onCompleteText}</h4>
        );


      });
    });
  }
  setContent(content){
    this.props.funcs.setProcessModalContent(
      <div className="processModalContent">
        {content}
      </div>
    );
  }
  
}