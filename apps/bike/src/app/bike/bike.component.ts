import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BikesFacade } from '@thirty/core-state'
import { Bike } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikesComponent implements OnInit {
  bikes$: Observable<Bike[]> = this.bikeFacade.allBikes$;
  bike$: Observable<Bike> = this.bikeFacade.selectedBike$;

  constructor(private bikeFacade: BikesFacade) { }

  ngOnInit(): void {
    this.bikeFacade.loadBikes();
  }

  select(bike: Bike): void{
    this.bikeFacade.selectBike(bike.id);
  }

  delete(bike: Bike): void{
    this.bikeFacade.deleteBike(bike);

    this.bikeFacade.loadBikes();
  }

  save(bike: Bike): void{
    if(bike.id !== null){
      this.bikeFacade.updateBike(bike);
    }else {
      this.bikeFacade.createBike(bike);
    }

    this.bikeFacade.loadBikes();
  }

  cancel(): void{
    this.bikeFacade.resetSelectedBike();
  }

}
