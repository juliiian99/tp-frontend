import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { ActivatedRoute } from "@angular/router";
import { JugadorService } from 'src/app/services/jugadores/jugador.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abmc-jugador',
  templateUrl: './abmc-jugador.component.html',
  styleUrls: ['./abmc-jugador.component.css']
})
export class AbmcJugadorComponent implements OnInit {
  jugador: Jugador = { 
    nombre_usuario: "", 
    nombre: "", 
    apellido: "", 
    contrasena:""
  };
  nombreUsuario?: string;
  errors: String = "";

  constructor(private jugadorService: JugadorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.nombreUsuario = this.route.snapshot.paramMap.get("nombre_usuario") as string;
    if(this.nombreUsuario !== 'nuevo'){
      this.getByNombreUsuario(this.nombreUsuario);
    }
  }

  validate(){
    let isValid = true;
    if(this.jugador.nombre_usuario === ""){
      this.errors += '<p> El nombre de usuario no puede ser vacío </p>';
      isValid = false;
    }
    if(this.jugador.nombre === ""){
      this.errors += '<p> El nombre no puede ser vacío </p>';
      isValid = false;
    }
    if(this.jugador.apellido === ""){
      this.errors += '<p> El apellido no puede ser vacío </p>';
      isValid = false;
    }
    if(this.jugador.contrasena.length < 6){
      this.errors += '<p> La contraseña tiene que tener mas de 6 caracteres </p>';
      isValid = false;
    }
    return isValid;
  }

  getByNombreUsuario(nombreUsuario: string): void {
    this.jugadorService.getByNombreUsuario(nombreUsuario)
      .subscribe(jugador => this.jugador = jugador as Jugador);
  }

  create(){
    if(this.validate()){
      this.jugadorService.post(this.jugador as Jugador).subscribe();
      Swal.fire({
        title: 'Jugador creado correctamente',
        icon: 'success',
      })
      .then(() => { 
        this.router.navigate(['/jugadores']) 
      });  
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Existen errores al ingresar los datos',
        icon: 'error',
        html: this.errors,
      });
      this.errors = "";
    }
  }

  update(){
    if(this.validate()){
      this.jugadorService.put(this.jugador as Jugador).subscribe();
      Swal.fire({
        title: 'Jugador actualziado correctamente',
        icon: 'success',
      })
      .then(() => { 
        this.router.navigate(['/jugadores']) 
      });  
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Existen errores al ingresar los datos',
        icon: 'error',
        html: this.errors,
      });
      this.errors = "";
    }
  }

}
