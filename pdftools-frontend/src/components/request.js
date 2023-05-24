import Globals from './globals';

class Request {
  constructor(method, url, data = {}) {
    this.method = method;
    this.url = url;
    this.data = data;
  }

  send() {
    return new Promise((resolve, reject) => {
      console.log("Sending")
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      
      xhr.open(this.method, Globals.url(this.url));
      for (let key in this.data) {
        formData.append(key, this.data[key]);
      }
      xhr.onload = function(){
        console.log("Loaded")
        resolve(this);
      }

      xhr.send(formData);
      console.log("sent")
      
    });
  }
}


export default Request