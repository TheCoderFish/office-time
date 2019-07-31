import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { timeValidator } from '../../shared/validators/timeValidator';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

const MY_PICKER_CONFIG = {
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

  private officeFromTime: string;
  private officeToTime: string;
  // currently fixed fot hours only can be updated to use mins and secs as well
  private officeHours: number;
  // for validations - Office Start Time
  private minStartTime = 8;
  private maxStartTime = 11;

  constructor(private fb: FormBuilder,
              private config: NgbTimepickerConfig) {
    const props = Object.getOwnPropertyNames(config);
    props.forEach(property => {
      config[property] = MY_PICKER_CONFIG[property]
    });
  }

  ngOnInit() {
    this.officeTimeForm = this.officeTimeInit();
    this.officeFromTime = '10:00';
    this.setTime(this.officeFromTime, this.fromTime);
    this.officeHours = 10;
    this.officeToTime = this.getToTime();
    this.setTime(this.officeToTime, this.toTime);
  }

  officeTimeInit(): FormGroup {
    return this.fb.group({
      fromTime: ['', timeValidator(this.minStartTime, this.maxStartTime)],
      toTime: [''],
    });
  }

  get fromTime() {
    return this.officeTimeForm.get('fromTime') as FormControl;
  }

  get toTime() {
    return this.officeTimeForm.get('toTime') as FormControl;
  }

  onSubmit() {
    console.log(this.officeTimeForm.value);
  }

  private setTime(input: string, control: FormControl) {
    const hours = this.getHourFromTime(input);
    const minutes = this.getMinuteFromTime(input);
    control.patchValue({
      hour: hours,
      minute: minutes
    });
  }

  private disableSpinner() {
    this.fromTime.valueChanges.subscribe(x => {
      console.log(this.fromTime.errors);
      if (this.fromTime.hasError('tooEarly')) {
        console.log('done');
      }
    });
  }

  private getToTime() {
    return `${this.getHourFromTime(this.officeFromTime) + this.officeHours} :
    ${this.getMinuteFromTime(this.officeFromTime)}`;
  }

  private getHourFromTime(input: string) {
    return parseInt(input.split(':')[0], 10);
  }

  private getMinuteFromTime(input: string) {
    return parseInt(input.split(':')[1], 10);
  }

}
