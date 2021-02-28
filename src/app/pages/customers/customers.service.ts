import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customers: Observable<Customer[]>;
  private customersCollection: AngularFirestoreCollection<Customer>;

  constructor(private readonly afs: AngularFirestore) { 
    this.customersCollection = afs.collection<Customer>('customers');
    this.getCustomers();
  }

  onDeleteCustomer(custId: string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const result = await this.customersCollection.doc(custId).delete();
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }
  
  onSaveCustomer(customer: Customer, custId:string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const id = custId || this.afs.createId();
        const data = {id, ... customer};
        const result = await this.customersCollection.doc(id).set(data);
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }

  private getCustomers(): void{
    this.customers = this.customersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Customer))
    );
  }
}
