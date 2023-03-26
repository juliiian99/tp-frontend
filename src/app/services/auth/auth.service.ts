import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/models/player';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/auth';
  authSubject = new BehaviorSubject(false);
  private token?: string;
  constructor(private httpClient: HttpClient) { }

  register(user: Player): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`, user)
      .pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            console.log(res.playerData.accessToken, res.playerData.expiresIn);
            this.saveToken(res.playerData.accessToken, res.playerData.expiresIn);
          }
        })
      );
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`, {username, password})
      .pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            this.saveToken(res.playerData.accessToken, res.playerData.expiresIn);
            this.getToken();
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    console.log(token, expiresIn);
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || undefined;
    }
    return this.token ?? '';
  }

}
