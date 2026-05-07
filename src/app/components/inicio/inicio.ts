import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { GameService } from '../../services/game';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-inicio',
  imports: [RouterLink,CommonModule,RouterModule], 
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  public gameService = inject(GameService);
}