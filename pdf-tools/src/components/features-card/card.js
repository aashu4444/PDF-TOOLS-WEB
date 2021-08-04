import React from 'react';
import "./card.css";

export default function Card(props){
    return (
            <div className="mycard z-depth-1">
                <div className="mycard-header">
                    <i className="material-icons">{props.icon}</i>
                </div>
                <h5 className="mycard-title">{props.heading}</h5>
                <p className="mycard-text">{props.text}</p>
            </div>
    )
}