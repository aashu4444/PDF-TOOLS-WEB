import React, { useState } from 'react';
import './get-started.css';
import ENCPDFMODAL from '../modals/_encrypt_pdf_modal';
import DCRPDFMODAL from '../modals/_decrypt_pdf_modal';
import RIPDFMODAL from '../modals/_remove_images_modal';
import RLPDFMODAL from '../modals/_remove_links_modal';
import EIPDFMODAL from '../modals/_extract_images_from_pdf_modal';
import SOPPDFMODAL from '../modals/_save_operation_pages_modal';
import {Modal, Button} from 'react-materialize';
import Globals from '../globals';
import UploadInstruction from '../upload_instructions';
import {gsap} from 'gsap';

export default function GetStarted(){
    let [selectedFile, setSelectedFile] = useState("No File Choosen...");
    const [state, setState] = useState(false);
    const [processModalContent, setProcessModalContent] = useState(<h6 className="processModalContent" style={{"margin":"2rem 0"}}>Processing pdf please pdf...</h6>)
    const [processModalHeading, setprocessModalHeading] = useState(<h4 className="theme-color processModalHeading animate">Processing...</h4>);
    let funcs = {setProcessModalContent:setProcessModalContent, setprocessModalHeading:setprocessModalHeading, changeState:changeState, setState:function(state){setState(state)}};

    let featuresShown = false;
    
    const [operationPagesModal, setOperationPagesModal] = useState(false)

    function changeState(){
        setState(false);
    }

    // A Function triggered when user selects a pdf file
    const pdfSelected = (e)=>{
        let selectedFileName = e.target.value.replace("C:\\fakepath\\", ""); // Name of selected file
        
        
        
    
        if (selectedFileName === "" && featuresShown === false){
            // Show intruction on the page
            gsap.to("#uploadInstruction", {"transform":"rotate(0deg)", "opacity":"1", "pointerEvents":"all"});

            // Remove features on the page
            gsap.to(".feature", {"opacity":"0","transform":"translateY(14px)", "pointerEvents":"none", "display":"none", stagger:0.2});

            // Show the set operation pages btn
            gsap.to('.fixed-btn', {"opacity":"0", "transform":"rotate(0deg)", "display":"none"});

            // Set featuresShow variable to false
            featuresShown = false;

            // Set the SelectedFile to No File Choosen...
            setSelectedFile("No File Choosen...");

        }
        else{
            // Remove instruction from the page
            gsap.to("#uploadInstruction", {"transform":"rotate(4deg)", "opacity":"0", "pointerEvents":"none"});
            
            // Show features on the page
            gsap.to(".feature", {"display":"block", "opacity":"1","transform":"translateY(0px)", "pointerEvents":"all", stagger:0.2})

            // Show the set operation pages btn
            gsap.to('.fixed-btn', {"display":"flex", "opacity":"1", "transform":"rotate(360deg)"})

            // Set featuresShow variable to true
            featuresShown = true;

            // Set operation pages to all
            Globals.setOperationPages(["all"]);

            // Show the selected file to the user
            setSelectedFile(selectedFileName);
        }

    }

    const setPages = () => {
        setOperationPagesModal(false);
        const pagesArr = document.querySelector("#operationPages").value.split(",").map(item => {
            if (!item.includes("-")){
                return Number(item);
            }
            else{
                return item
            }
        });
        Globals.setOperationPages(pagesArr);
    }

    // Set currentOperation when user click on a feature
    let features = document.querySelectorAll(".feature") // Get all the features

    // Iterate through all features
    for(let feature of features){
        // Add a click event on current feature
        feature.addEventListener("click", e =>{
            // Get the feature name
            let featureName = feature.querySelector(".mycard-title").innerText;

            // Set the feature name(current operation) to Globals.
            Globals["currentOperation"] = featureName;
        });

    }

    return (
        <>
        <Modal 
            open={operationPagesModal}
            actions={
                [
                    <Button modal="close" node="button" waves="light" className="theme-bg disable">Close</Button>,
                    <Button modal="close" node="button" waves="light" className="theme-bg" onClick={e => setPages()}>Confirm</Button>,
                ]
            } 
            
            trigger={<Button node="button" waves="light" className="theme-bg fixed-btn">+</Button>}>


            <h4 className="theme-color modalHeading" style={{ "display": "flex" }}>Set operation pages</h4>

            <div className="input-field col s6" style={{ "margin": "3rem 0" }}>
                <input id="operationPages" type="text" className="theme-color" />
                <label htmlFor="operationPages" style={{ "left": "0" }}>Enter page numbers</label>
            </div>

        </Modal>
        
        <section className="get-started mt-2">
            <div id="layoutContainer">
                <div>
                    <form className="flex content-center" encType="multipart/form-data">
                        <div className="selected-file-container">
                            <p id="selectedPdfName">{selectedFile}</p>
                        </div>
                        <input type="file" name="pdfInput" id="pdfInput" onChange={(e)=>{pdfSelected(e)}} hidden/>
                        <label className="btn-large z-depth-0 waves-effect waves-light red" htmlFor="pdfInput">Choose PDF</label>
                    </form>
                </div>
                <UploadInstruction />
                <div className="mt-2" id="featuresLayout">
                    
                    <ENCPDFMODAL funcs={funcs}/>
                    <DCRPDFMODAL funcs={funcs}/>
                    <RIPDFMODAL funcs={funcs}/>
                    <RLPDFMODAL funcs={funcs}/>
                    <EIPDFMODAL funcs={funcs}/>
                    <SOPPDFMODAL funcs={funcs}/>
                </div>
            </div>
            <Modal open={state} id="process_pdf_modal"
                actions={[
                    <Button onClick={changeState} node="button" waves="light" className="theme-bg">Close</Button>
                ]}
                >
                {processModalHeading}
                
                {processModalContent}
                
            </Modal>
        </section>
        </>
    )
}