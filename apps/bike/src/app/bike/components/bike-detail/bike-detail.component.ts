import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Bike } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.scss']
})
export class BikeDetailComponent implements OnInit, OnChanges{
  @Input() bike: Bike;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  bikeForm: FormGroup;

  brands = [ 'KTM', "Honda"]

  styles = {
    ktm: ['450 SX-F', '250 SX-F', '350 SX-F', '250 SX', '150 SX'],
    honda: ['CRF 450R', 'CRF 450X', 'CRF 250R', "CRF 250X", 'CR 250R']
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.bikeForm && this.bike){
      this.bikeForm.patchValue(this.bike)
    }
  }

  createFormGroup(){
    this.bikeForm = this.formBuilder.group({
      id: [],

      brand: new FormControl('', [
        Validators.required,
      ]),
      style: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('', [
        Validators.required,
      ]),
    })
  }
}
