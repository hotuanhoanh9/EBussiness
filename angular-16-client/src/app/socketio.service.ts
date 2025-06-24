import { io } from 'socket.io-client';
import { environment } from './environment';

export class SocketioService {

  socket: any;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {extraHeaders: {
      "ngrok-skip-browser-warning": "abc"
    }});
    this.socket.on('connect', () => {
      console.log("connect", this.socket.id);
      
      localStorage.setItem('socketID', this.socket.id);
      this.socket.on('getMessage', (data: any) => {
        console.log(" data getMessage", data);
        if(data.message == "DONE"){
          window.location.href = "result?success=true";
        } else {
          window.location.href = "result?success=false";
        }
      });
    });
    
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  sendMsg(title: string, msg: string){
    this.socket.emit(title, msg);
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }
  getMsg(){
    this.socket.on('getMessage', (data: any) => {
      
     
      
      
    });
  }
}
