import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/shared/models/vehicle.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  vehicles: Observable<Vehicle[]>;
  private vehiclesCollection: AngularFirestoreCollection<Vehicle>;

  constructor(private readonly afs: AngularFirestore) { 
    this.vehiclesCollection = afs.collection<Vehicle>('vehicles');
    this.getVehicles();
  }

  onDeleteVehicle(vehId: string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const result = await this.vehiclesCollection.doc(vehId).delete();
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }
  
  onSaveVehicle(vehicle: Vehicle, vehId:string): Promise<void>{
    return new Promise(async(resolve, reject)=>{
      try{
        const id = vehId || this.afs.createId();
        const data = {id, ... vehicle};
        const result = await this.vehiclesCollection.doc(id).set(data);
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    });
  }

  private getVehicles(): void{
    this.vehicles = this.vehiclesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Vehicle))
    );
  }

}
