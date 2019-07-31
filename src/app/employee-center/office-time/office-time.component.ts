import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

const myPickerConfig = {
  meridian: true,
  spinners: true,
  seconds: false,
  hourStep: 1,
  minuteStep: 15,
  secondStep: 1,
  disabled: false,
  readonlyInputs: false,
  size: 'small'
};

@Component({
  selector: 'app-office-time',
  templateUrl: './office-time.component.html',
  styleUrls: ['./office-time.component.scss'],
})
export class OfficeTimeComponent implements OnInit {


  officeTimeForm: FormGroup;

  constructor(private fb: FormBuilder,
    private config: NgbTimepickerConfig) {
    const props = Object.getOwnPropertyNames(config);
    props.forEach(property => {
      config[property] = myPickerConfig[property]
    });

  }

  ngOnInit() {
    this.officeTimeForm = this.officFormInit();
  }

  officFormInit(): FormGroup {
    return this.fb.group({
      fromTime: [''],
      toTime: ['']
    });
  }

}
