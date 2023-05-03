import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/players/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  player?: Player;
  username: String = 'test';
  columns: String[] = ['username', 'name', 'lastname', 'password', 'actions'];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => (this.players = players));
  }

  delete(username: String) {
    Swal.fire({
      title: 'Esta seguro que quiere eliminar este jugador?',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then(() => {
      this.playerService.delete(username).subscribe(() => {
        this.getPlayers();
      });
    });
  }
}
