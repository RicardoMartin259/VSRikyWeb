import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { VehiclesService } from '../vehicles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehicles = this.vehiclesSvc.vehicles;
  navigationExtras: NavigationExtras = {
    state: {
      vehicle: null
    }
  }

  constructor(private router: Router, private vehiclesSvc: VehiclesService) { }

  ngOnInit(): void {
  }

  async onDelete(vehId: string): Promise<void>{
    try {
      await this.vehiclesSvc.onDeleteVehicle(vehId);
      alert('Eliminado');
    } catch (err) {
      console.log(err);
    }
    
  }

  onDetails(vehicle: any){
    this.navigationExtras.state.vehicles = vehicle;
    this.router.navigate(['vehiclesDetail'], this.navigationExtras);
  }

}
