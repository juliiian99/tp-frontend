import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.urlBase}/players`);
  }
  getByNombreUsuario(username: String): Observable<Player> {
    return this.http.get<Player>(`${environment.urlBase}/players/${username}`);
  }
  post(player: Player) {
    return this.http.post(`${environment.urlBase}/players`, { player: player });
  }
  put(player: Player) {
    return this.http.put(`${environment.urlBase}/players/${player.username}`, { player: player });
  }
  delete(username: String) {
    return this.http.delete(`${environment.urlBase}/players/${username}`);
  }
}
