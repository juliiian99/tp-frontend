import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition, animation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('blur', [
      state('hide',
        style({
          opacity: 0,
          filter: 'blur(10px)',
        })
      ),
      state('show',
        style({
          opacity: 1,
          filter: 'blur(0px)',
        })
      ),
      transition('hide => show', [
        animate('1s'),
      ]),
    ])
  ]
})
export class AppComponent implements AfterContentInit{
  title = 'tp-front';
  hidden: boolean = true;
  // !: significa que no define la variable hasta que se le asigne un valor
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('head') head!: ElementRef;
  opened: boolean = false;

  ngAfterContentInit() {
    setTimeout(() => {
      this.hidden = false;
    }, 1000)
  }
}
