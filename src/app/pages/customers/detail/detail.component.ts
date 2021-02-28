import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer.interface';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      customer: null
    }
  }
  
  customer: Customer = null;

  constructor(private router: Router, private customersSvc: CustomersService) { 
    const navigation = this.router.getCurrentNavigation();
    this.customer = navigation?.extras?.state?.customer;
  }

  ngOnInit(): void {

    if(typeof this.customer == 'undefined'){
      this.router.navigate(['customersList']);
    }

  }

  onEdit(){
    this.navigationExtras.state.customer = this.customer;
    this.router.navigate(['customersEdit'], this.navigationExtras);
  }

  async onDelete(): Promise<void>{
    try {
      await this.customersSvc.onDeleteCustomer(this.customer?.id);
      alert('Eliminado');
      this.onBackToList();
    } catch (err) {
      console.log(err);
    }
    
  }

  onBackToList(): void{
    this.router.navigate(['customersList']);
  }
}
