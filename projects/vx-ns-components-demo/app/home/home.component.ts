import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routes = [
    {name: 'Form Field', route: '/form-field'},
    {name: 'Radio', route: '/radio'},
    {name: 'Menu', route: '/menu'},
    {name: 'Autocomplete', route: '/autocomplete'},
    {name: 'Button', route: '/button'},
    {name: 'Pager', route: '/pager'}
  ];
}

