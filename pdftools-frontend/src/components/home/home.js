import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

let webName = "PDF Tools"

export default function Home(){
    return (
        <>
            <section className="home">
                <div className="container" style={{"display":"flex"}}>
                    <div>
                        <h3 className="red-text">{webName}</h3>
                        <p className="describe red-text">Welcome to {webName}. {webName} provides many features to deal with pdf files you can do anything with your pdf files here. this is easy and simple just upload your pdf and just play with your pdf file using {webName}.</p>
                        <div>
                            <Link style={{"display":"inline-flex", "marginTop":"1rem"}} to="/get-started" className="get-started-btn waves-effect waves-light red btn-large">Get Started  <i className="material-icons">arrow_forward</i></Link>
                        </div>
                    </div>
                    <div className="pdfIcon">
                        <i className="material-icons pdf-icon red-text">picture_as_pdf</i>
                    </div>
                </div>
            </section>
        </>
    )
}