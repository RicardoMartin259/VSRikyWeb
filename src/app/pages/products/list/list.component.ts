import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(private router: Router, private productsSvc: ProductsService) { }

  ngOnInit(): void {
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
