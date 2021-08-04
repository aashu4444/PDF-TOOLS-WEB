import React from 'react'
import { Button } from 'react-materialize';
import Globals from '../globals';

export default function FileRow(props) {

    const deleteFromServer = (url, originalFileName=undefined, removeFolder="false") => {
        // If use wants to remove pdf file
        if (removeFolder === "false"){
            Globals.removeFileFromServer(url, originalFileName);
        }
        // If user wants to remove folder
        else if(removeFolder === "true"){
            Globals.removeFileFromServer(url, originalFileName, removeFolder);
        }

        // Upadate the ui
        props.setMyFiles(JSON.parse(localStorage.getItem("myFiles")))
        
    }

    return (
        <>
            <tr>
                <td>{props.item[0]}</td>
                <td>{props.item[2]}</td>
                <td>
                    <a href={Globals.url(`/${props.item[1]}`)}><Button node="button" waves="light" className="theme-bg" >Download</Button></a>
                    &nbsp;

                    <Button onClick={e => { props.item[2].toLowerCase() === "extract images" ? deleteFromServer("static/" + props.item[0], null, "true") : deleteFromServer(`${props.item[1]}`, props.item[0]) }} node="button" waves="light" className="theme-bg" >Delete From Server</Button>
                </td>
            </tr>
        </>
    )
}
