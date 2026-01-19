import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon';
import { Analytics } from "@vercel/analytics/next"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ComingSoonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vettroTraders-comingSoon');
}
