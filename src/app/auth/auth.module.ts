import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth/auth.service';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const imports = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  AuthRoutingModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    [...imports],
  ],
  providers: [
    AuthService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]

})
export class AuthModule { }
