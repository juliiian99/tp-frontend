import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerCrudComponent } from './components/player/player-crud/player-crud.component';
import { SocketComponent } from './components/socket/socket.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'socket', component: SocketComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayerComponent, canActivate: [AuthGuard] },
  {
    path: 'players/:username',
    component: PlayerCrudComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
