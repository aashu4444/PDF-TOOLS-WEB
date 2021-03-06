import React from 'react';
import './myfiles.css';
import { useState } from 'react';
import FileRow from './fileRow';

export default function Myfiles(){
    let files = localStorage.getItem("myFiles");
    let initialState;

    if (files != null){
        initialState = JSON.parse(files);
    }
    else{
        initialState = [];
    }
    const [myfiles, setMyFiles] = useState(initialState);

    console.log(myfiles);
    let index = 0;
    return (
        <>
        <br />
        <table className="container">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Operation Name</th>
                    <th>Actions</th>
                </tr>
            </thead>    
            <tbody>
                {myfiles.map(item => 
                    {index += 1; return (<FileRow item={item} setMyFiles={setMyFiles} key={index} />) }
                )}
            </tbody>
        </table>    
        </>
    )
}