import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/pages/customers/customers.service';
import { Customer } from '../../models/customer.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = null;
  customerForm: FormGroup;
  private isEmail = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
  private isEmail2 = '/\S+@\S+\.\S+/';

  constructor(private router: Router, private fb: FormBuilder, private customersSvc: CustomersService) { 
    const navigation = this.router.getCurrentNavigation();
    this.customer = navigation?.extras?.state?.customer;
    this.initForm();
  }

  ngOnInit(): void {

    if(typeof this.customer == 'undefined'){
      this.router.navigate(['customersNew']);
    }else{
      this.customerForm.patchValue(this.customer);
    }

  }

  onSave(): void{
    console.log('saved', this.customerForm.value);
    if(this.customerForm.valid){
      console.log('saved')
      const customer = this.customerForm.value;
      const customerId = this.customer?.id || null;
      this.customersSvc.onSaveCustomer(customer, customerId);
      this.customerForm.reset();
    }else{
      console.log('falló')
    }
  }

  private initForm(): void{
    this.customerForm = this.fb.group({
      docType: ['', [Validators.required]],
      docNum: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      address: ['', [Validators.required]],
    });
  }

  isValidField(field: string): string {
    const validatedField = this.customerForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid': '';
  }

  onBackToList(): void{
    this.router.navigate(['customersList']);
  }

}
