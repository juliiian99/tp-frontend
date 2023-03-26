import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlayerService } from 'src/app/services/players/player.service';
const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string = '';
  password : string = '';
  hide: boolean = true;

  constructor(private authService: AuthService, private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {}

  submit(): void{
    this.clear();
  }

  clear(): void{
    this.username ="";
    this.password = "";
  }

  onLogin(): void {
    this.authService.login( this.username, this.password ).subscribe(res => {
      this.router.navigateByUrl('/home');
    });
  }
}
