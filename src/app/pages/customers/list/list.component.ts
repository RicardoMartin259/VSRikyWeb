import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  customers = this.customersSvc.customers;
  navigationExtras: NavigationExtras = {
    state: {
      customer: null
    }
  }

  constructor(private router: Router, private customersSvc: CustomersService) { }

  ngOnInit(): void {
  }

  async onDelete(custId: string): Promise<void>{
    try {
      await this.customersSvc.onDeleteCustomer(custId);
      alert('Eliminado');
    } catch (err) {
      console.log(err);
    }
    
  }

  onDetails(customer: any){
    this.navigationExtras.state.customer = customer;
    this.router.navigate(['customersDetail'], this.navigationExtras);
  }

}
