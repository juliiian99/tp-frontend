import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { ActivatedRoute } from "@angular/router";
import { PlayerService } from 'src/app/services/players/player.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player-crud',
  templateUrl: './player-crud.component.html',
  styleUrls: ['./player-crud.component.css']
})
export class PlayerCrudComponent implements OnInit {
  player: Player = {
    username: '',
    name: '',
    lastname: '',
    password:'',
    expiresIn: '',
    accessToken: '',
  };
  username?: string;
  errors: String = '';

  constructor(private playerService: PlayerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("username") as string;
    if(this.username !== 'new'){
      this.getByUsername(this.username);
    }
  }

  validate(){
    let isValid = true;
    if(this.player.username === ""){
      this.errors += '<p> El nombre de usuario no puede ser vacío </p>';
      isValid = false;
    }
    if(this.player.name === ""){
      this.errors += '<p> El nombre no puede ser vacío </p>';
      isValid = false;
    }
    if(this.player.lastname === ""){
      this.errors += '<p> El apellido no puede ser vacío </p>';
      isValid = false;
    }
    if(this.player.password.length < 6){
      this.errors += '<p> La contraseña tiene que tener mas de 6 caracteres </p>';
      isValid = false;
    }
    return isValid;
  }

  getByUsername(username: string): void {
    this.playerService.getByNombreUsuario(username)
      .subscribe(player => this.player = player as Player);
  }

  create(){
    if(this.validate()){
      this.playerService.post(this.player as Player).subscribe({
        next: () => {
          Swal.fire({
            title: 'Jugador creado correctamente',
            icon: 'success',
          })
          .then(() => {
            this.router.navigate(['/players'])
          })
        },
        error: (e) =>{
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: e.error.errors.map( (e: any) => e.msg),
          });
        }
      });
    }
  }

  update(){
    if(this.validate()){
      this.playerService.put(this.player as Player).subscribe({
        next: () => {
          Swal.fire({
            title: 'Jugador editado correctamente',
            icon: 'success',
          })
          .then(() => {
            this.router.navigate(['/players'])
          })
        },
        error: (e) =>{
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: e.error.errors.map( (e: any) => e.msg),
          });
        }
      });
    }
  }

}
