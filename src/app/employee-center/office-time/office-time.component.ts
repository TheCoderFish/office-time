import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { PickerConfig } from '../../model/pickerConfig';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-office-time',
  templateUrl: './office-time.component.html',
  styleUrls: ['./office-time.component.scss']
})
export class OfficeTimeComponent implements OnInit {

  myPickerConfig: PickerConfig = {
    meridian: true,
    spinners: true,
    seconds: false,
    hourStep: 3,
    minuteStep: 1,
    secondStep: 1,
    disabled: false,
    readonlyInputs: false,
    size: 'medium'
  };

  officeTimeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private pickerConfig: NgbTimepickerConfig) { }

  ngOnInit() {
    this.pickerConfig = this.myPickerConfig;
    this.officeTimeForm = this.officFormInit();
  }

  officFormInit(): FormGroup {
    return this.fb.group({
      fromTime: [''],
      toTime: ['']
    });
  }

}
