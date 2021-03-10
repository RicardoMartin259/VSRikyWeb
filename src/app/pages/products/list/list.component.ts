import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/products.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products = this.productsSvc.products;
  navigationExtras: NavigationExtras = {
    state: {
      product: null
    }
  }

  product: Product = null;
  productForm: FormGroup;

  addingNew: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private productsSvc: ProductsService) { 
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.product;
    this.initForm();
  }

  ngOnInit(): void {
  }

  onSave(): void{
    console.log('saved', this.productForm.value);
    if(this.productForm.valid){
      console.log('saved')
      const product = this.productForm.value;
      const productId = this.product?.id || null;
      this.productsSvc.onSaveProduct(product, productId);
      this.productForm.reset();
    }else{
      console.log('falló')
    }
  }

  private initForm(): void{
    this.productForm = this.fb.group({
      prodType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      singleQuant: [0, [Validators.required]],
      boxQuant: [0, [Validators.required]],
      price: [0, [Validators.required]],
      boxPrice: [0, [Validators.required]],
    });
  }

  isValidField(field: string): string {
    const validatedField = this.productForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid': '';
  }

  addingNewProduct(){
    this.addingNew = !this.addingNew;
  }

  async onDelete(custId: string): Promise<void>{
    try {
      await this.productsSvc.onDeleteProduct(custId);
      alert('Eliminado');
    } catch (err) {
      console.log(err);
    }
    
  }

  onDetails(product: any){
    this.navigationExtras.state.product = product;
    this.router.navigate(['productsDetail'], this.navigationExtras);
  }
}
