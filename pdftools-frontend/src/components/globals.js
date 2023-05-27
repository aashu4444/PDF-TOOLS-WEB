import Request from './request';


const globals = {
    url:function(url){
        return `http://${process.env.REACT_APP_HOST}${url}`
    },
    addFile:function(pdfName, pdfUrl){
        // The data to be added in localStorage.
        let data = [pdfName, pdfUrl, globals.currentOperation];

        let myFiles = localStorage.getItem("myFiles");
        if (myFiles == null){
            let arr = [data];
            localStorage.setItem("myFiles", JSON.stringify(arr));
        }
        else{
            // Parse the existing files data
            let arr = JSON.parse(myFiles);

            // Peretend that the new data is not exists in localStorage
            let exists = false;

            // Iterate throw all file in arr
            arr.forEach(item => {
                // If new data exists in arr then set exists variable to true
                if (item === data){
                    exists = true;
                }
            });

            // If new data does not exists in arr then push/append new data to the arr and set the arr in localStorage
            if (exists === false){
                arr.push(data);
                localStorage.setItem("myFiles", JSON.stringify(arr));
            }
        }
    },
    setOperationPages:function(pagesArray){
        let request = new Request("post", "/setOperationPages", {
            "pdf_file":document.querySelector("#pdfInput").files[0],
            "pages":JSON.stringify(pagesArray),
        });
        request.send().then(() => {
            console.log("Testing again....");
        });
    },
    currentOperation:undefined,
    removeFileFromServer:function(url, originalFileName=document.querySelector("#pdfInput").files[0].name, removeFolder="false"){
        // Get all files from localStorage
        let arr = JSON.parse(localStorage.getItem("myFiles"));
        
        // Iterate through all files in arr
        for (let item of arr){
            // Get the item from arr
            try{
                // Try to parse the item - 
                JSON.parse(item[1])
                if (url.replace("static/PdfFiles/", "") === item[0]){
                    // Index of found item
                    let index = arr.indexOf(item);

                    // Remove the item from arr
                    arr.splice(index, 1);

                }
            }
            catch{

                if (item[1] === url){
                    // Index of found item
                    let index = arr.indexOf(item);
                    
                    // Remove the item from arr
                    arr.splice(index, 1);
                }
            }
        }

        // Set the arr to localStorage
        localStorage.setItem("myFiles", JSON.stringify(arr));

        // Create a new request object to send a post request to the server
        let request = new Request("post", "/remove_file", {url:url, originalFileName:originalFileName, removeFolder:removeFolder});

        // Send the request
        request.send().then(data => console.log(data));

    }
}

export default globals;