import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styles: [`:host {
    background-color: #106cc8;
    color: rgba(255, 255, 255, 0.87);
    display: block;
    height: 48px;
    padding: 0 16px;
  }

  h1 {
    display: inline;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 0.1px;
    line-height: 48px;
  }`]
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
