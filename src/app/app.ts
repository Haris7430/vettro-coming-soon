import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ScrollToTopComponent } from './components/shared/scroll-to-top/scroll-to-top.component';
import { inject } from "@vercel/analytics"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('vettroTraders-comingSoon');

  ngOnInit() {
    inject();
  }
}
