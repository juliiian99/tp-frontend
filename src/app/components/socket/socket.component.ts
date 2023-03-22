import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  context?: CanvasRenderingContext2D;
  msgs: string[] = [''];
  message: string = '';
  gridSize: number = 0;
  cellSize: number = 0;
  playerId: number = 0;
  nickname: string = 'default';
  players: any = null;
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;
  @ViewChild('canvas', {static: false}) canvas?: ElementRef;
  @ViewChild('canvasDiv') private canvasDiv?: ElementRef;

  constructor(private socketService: SocketService ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.socketService.key(event.keyCode);
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.socketService
      .getMessage()
      .subscribe((message: string) => {
        this.msgs.push(message);
      });
      this.auth();
      this.state();
    }

  ngAfterViewInit(): void {
    this.setCanvas();
    this.context = this.canvas?.nativeElement.getContext('2d');
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if(this.myScrollContainer && this.myScrollContainer.nativeElement){
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }

  sendMessage() : void {
    this.socketService.sendMessage(this.message);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  setCanvas() : void {
    if(this.canvasDiv){
      var ratio =
        this.canvasDiv.nativeElement.offsetWidth < this.canvasDiv.nativeElement.offsetHeight
        ? this.canvasDiv.nativeElement.offsetWidth
        : this.canvasDiv.nativeElement.offsetHeight;
        this.canvas ? this.canvas.nativeElement.width = this.canvas.nativeElement.height = ratio : null;
        this.gridSize = 40;
        this.cellSize = ratio / this.gridSize;
    }
  }

  /*
    Render game canvas & draw players, apples & scores
  */
  draw(players : any, apples : any) : void {
    // Render background
    this.context ? this.context.fillStyle = "#555" : null;
    this.context && this.canvas ? this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height) : null;

    // Render players
    players.forEach((p : any) => {
      if(p.id === this.playerId) {
        this.context ? this.context.fillStyle = "#fff" : null;
      } else {
        this.context ? this.context.fillStyle = "#4286f4" : null;
      }
      this.context ? this.context.fillRect(p.x * this.cellSize, p.y * this.cellSize, this.cellSize, this.cellSize) : null;

      // tails
      p.tail.forEach((t : any) => {
        this.context ? this.context.fillRect(t.x * this.cellSize, t.y * this.cellSize, this.cellSize, this.cellSize) : null;
      });
    });

    // Render apples
    apples.forEach((a : any) => {
      if(this.context){
        this.context.fillStyle = "#ff0000";
        this.context.fillRect(a.x * this.cellSize, a.y * this.cellSize, this.cellSize, this.cellSize);
      }
    });
  }

  // Authenticate
  auth(){
    this.socketService.auth(this.nickname, (session: any) => { this.playerId = session.id })
  }

  state(){
    this.socketService.state().subscribe((stuff : any) => {
      this.players = stuff.players;
      this.draw(stuff.players, stuff.apples);
    });
  }

}
