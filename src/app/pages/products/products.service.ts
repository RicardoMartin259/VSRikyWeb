import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private readonly afs: AngularFirestore) { 
    this.productsCollection = afs.collection<Product>('products');
    this.getProducts();
  }

  onDeleteProduct(prodId: string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const result = await this.productsCollection.doc(prodId).delete();
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }
  
  onSaveProduct(product: Product, prodId:string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const id = prodId || this.afs.createId();
        const data = {id, ... product};
        const result = await this.productsCollection.doc(id).set(data);
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }

  private getProducts(): void{
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    );
  }
}
