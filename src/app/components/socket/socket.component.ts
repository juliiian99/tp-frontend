import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

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
      .subscribe(({nickname, message}) => {
        this.msgs.push(`${nickname}: ${message}`);
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
    if(this.context && this.canvas){
      let grd = this.context.createRadialGradient(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 1.8, 20, this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 200);
      grd.addColorStop(0,"black");
      // grd.addColorStop(0.2,"orange");
      // grd.addColorStop(0.4,"green");
      // grd.addColorStop(0.6,"red");
      // grd.addColorStop(0.8,"yellow");
      grd.addColorStop(1,"gray");
      this.context.fillStyle = grd;
      this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      this.context.font = "30px Comic Sans MS";
      this.players.forEach((player: any, index:number) => {
        let legendY = ++index * 40;
        this.context ? this.context.fillStyle = "rgba(255,255,255, 0.2)" : null;
        this.context ? this.context.textAlign = "start" : null;
        this.context?.fillText(`${player.nickname}`, this.canvas?.nativeElement.width / 1.6, legendY);
        this.context? this.context.fillStyle = player.color : null;
        this.context?.fillRect(this.canvas?.nativeElement.width - 30, legendY - 20, 20, 20);
      })
    }

    // Render players
    players.forEach((p : any) => {
      if(this.context){
        this.context.fillStyle = p.color;
        this.context.fillRect(p.x * this.cellSize, p.y * this.cellSize, this.cellSize, this.cellSize);

        // tails
        p.tail.forEach((t : any) => {
          this.context?.fillRect(t.x * this.cellSize, t.y * this.cellSize, this.cellSize, this.cellSize);
        });
      }
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
    let playerConfigurations = { nickname : 'default', color: '#fff'};
    this.socketService.auth(playerConfigurations, (session: any) => { this.playerId = session.id });
  }

  state(){
    this.socketService.state().subscribe((stuff : any) => {
      this.players = stuff.players;
      this.draw(stuff.players, stuff.apples);
    });
  }

}
