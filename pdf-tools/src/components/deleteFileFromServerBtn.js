import React from 'react';
import Globals from './globals';

export default function deleteFileFromServerBtn(props) {
    return (
        <button onClick={e => Globals.removeFileFromServer(props.result.responseText)} className="btn-large theme-bg waves-effect waves-light">Delete file from server</button>
    )
}
