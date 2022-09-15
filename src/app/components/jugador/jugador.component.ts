import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { JugadorService } from 'src/app/services/jugadores/jugador.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugador?: Jugador;
  nombreUsuario: String = 'test';
  columns: String[] = ['nombre-usuario', 'nombre', 'apellido', 'contrasena', 'acciones'];

  constructor(private jugadorService: JugadorService, private router: Router) { }

  ngOnInit(): void {
    this.getJugadores();
  }

  getJugadores(): void {
    this.jugadorService.getJugadores()
      .subscribe(jugadores => this.jugadores = jugadores);
  }

  delete(nombreUsuario: String){
    Swal.fire({
      title: 'Esta seguro que quiere eliminar este jugador?',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then(() => {
      this.jugadorService.delete(nombreUsuario).subscribe( () => { this.getJugadores() });
    });
  }

}