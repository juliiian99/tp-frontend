import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from 'src/app/clases/jugador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class JugadorService {

  constructor(private http: HttpClient) { }

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${environment.urlBase}/jugadores`);
  }
  getByNombreUsuario(nombre_usuario: String): Observable<Jugador> {
    return this.http.get<Jugador>(`${environment.urlBase}/jugadores/${nombre_usuario}`);
  }
  post(jugador: Jugador) {
    return this.http.post(`${environment.urlBase}/jugadores`, { jugador: jugador });
  }
  put(jugador: Jugador) {
    return this.http.put(`${environment.urlBase}/jugadores/${jugador.nombre_usuario}`, { jugador: jugador });
  }
  delete(nombre_usuario: String) {
    return this.http.delete(`${environment.urlBase}/jugadores/${nombre_usuario}`);
  }
}
