import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { timeValidator } from '../../shared/validators/timeValidator';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MY_PICKER_CONFIG, VALID_TIMES } from '../../shared/constants/picker-constants';

@Component({
  selector: 'app-office-time',
  templateUrl: './office-time.component.html',
  styleUrls: ['./office-time.component.scss'],
})
export class OfficeTimeComponent implements OnInit {

  officeTimeForm: FormGroup;

  // private variables can be mapped from a constants file to declutter this component
  private officeFromTime: string;
  private officeToTime: string;
  // currently fixed fot hours only can be updated to use mins and secs as well
  private officeHours: number;

  // NgbTimepickerConfig service to load configuartions from MY_PICKER_CONFIG
  constructor(private fb: FormBuilder,
    private config: NgbTimepickerConfig) {
    // ISSUE: direct object to object assignment was updating internal values but was not reflecting on UI
    // also this assignment does not work in ngOnInit,
    const props = Object.getOwnPropertyNames(config);
    props.forEach(property => {
      config[property] = MY_PICKER_CONFIG[property];
    });
  }

  ngOnInit() {
    this.officeTimeForm = this.officeTimeInit();
    this.initializePickers();
    this.config.meridian = false; // this does not work here ?? afterviewinit fails as well
  }

  officeTimeInit(): FormGroup {
    return this.fb.group({
      fromTime: ['', timeValidator(VALID_TIMES.minStartTime, VALID_TIMES.maxStartTime)],
      toTime: ['', timeValidator(VALID_TIMES.minEndTime, VALID_TIMES.maxEndTime)],
    });
  }

  // Getters
  get fromTime() {
    return this.officeTimeForm.get('fromTime') as FormControl;
  }

  get toTime() {
    return this.officeTimeForm.get('toTime') as FormControl;
  }

  initializePickers() {
    this.officeFromTime = '10:00';
    this.setTime(this.officeFromTime, this.fromTime);
    this.officeHours = 10;
    this.officeToTime = this.getToTime();
    this.setTime(this.officeToTime, this.toTime);
  }

  onSubmit() {
    console.log(this.officeTimeForm.value);
  }


  // For Time Calculations
  private setTime(input: string, control: FormControl) {
    const hours = this.getHourFromTime(input);
    const minutes = this.getMinuteFromTime(input);
    control.patchValue({
      hour: hours,
      minute: minutes
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

  private disableSpinner() {
    this.fromTime.valueChanges.subscribe(x => {
      console.log(this.fromTime.errors);
      if (this.fromTime.hasError('tooEarly')) {
        console.log('done');
      }
    });
  }

}
