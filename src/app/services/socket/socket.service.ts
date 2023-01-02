import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) {}

  connect() : void {
    this.socket.emit('connection');
  }

  disconnect() : void {
    this.socket.emit('disconnect');
  }

  sendMessage(msg: string) : void{
    this.socket.emit('message', msg);
  }

  key(key : number){
    return this.socket.emit('key', key);
  }

  auth(nickname: string, session: CallableFunction){
    return this.socket.emit('auth', { nickname }, session);
  }

  state(){
    // Receive state from server
    return new Observable((observer: Observer<any>) => {
      this.socket.on('state', (stuff: any) => {
        observer.next(stuff)
      });
    })
  }

  getMessage() {
    return new Observable((observer: Observer<any>)=>{
      this.socket.on('message', (message:string)=>{
        observer.next(message)
      })
    })
  }

}