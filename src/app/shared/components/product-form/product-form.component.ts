import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/pages/products/products.service';
import { Product } from '../../models/products.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = null;
  productForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private productsSvc: ProductsService) { 
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.product;
    this.initForm();
  }

  ngOnInit(): void {

    if(typeof this.product == 'undefined'){
      this.router.navigate(['productsNew']);
    }else{
      this.productForm.patchValue(this.product);
    }

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

  onBackToList(): void{
    this.router.navigate(['productsList']);
  }

}
