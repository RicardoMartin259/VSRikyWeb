import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  template: `<app-customer-form></app-customer-form>`,
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
