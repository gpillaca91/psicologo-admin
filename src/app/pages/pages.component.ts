import { Component, OnInit } from '@angular/core';
declare function datainiJS():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor() {
    // datainiJS();
   }

  ngOnInit(): void {
    datainiJS();
  }
  

}
