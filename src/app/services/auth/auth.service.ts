import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/models/player';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/auth';
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user: Player): Observable<Player> {
    return this.httpClient.post<Player>(`${this.AUTH_SERVER}/register`, user)
      .pipe(tap(
        (player: Player) => {
          if (player) {
            this.saveToken(player);
          }
        })
      );
  }

  login(username: string, password: string): Observable<Player> {
    return this.httpClient.post<Player>(`${this.AUTH_SERVER}/login`, {username, password})
      .pipe(tap(
        (player: Player) => {
          if (player) {
            this.saveToken(player);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("PLAYER");
    this.router.navigate(['/home']);
  }

  private saveToken(player: Player): void {
    localStorage.setItem("ACCESS_TOKEN", player.accessToken);
    localStorage.setItem("EXPIRES_IN", player.expiresIn);
    localStorage.setItem("PLAYER", JSON.stringify(player));
    this.token = player.accessToken;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token ?? '';
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getPlayer(): Player {
    return JSON.parse(localStorage.getItem("PLAYER") ?? '');
  }

}
