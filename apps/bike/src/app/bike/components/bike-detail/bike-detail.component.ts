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
        Validators.minLength(2),
      ]),
      displacement: new FormControl(250, [
      ]),
      style: new FormControl('', [
      ]),
      stroke: new FormControl(4, [
      ])
    })
  }
}
