import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bike } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit {
  @Input() bikes: [Bike];
  @Output() selected = new EventEmitter<Bike>();
  @Output() deleted = new EventEmitter<Bike>();
  constructor() { }

  ngOnInit(): void {
  }

}
