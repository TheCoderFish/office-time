import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { timeValidator } from '../../shared/validators/timeValidator';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MY_PICKER_CONFIG, VALID_TIMES, INPUT } from '../../shared/constants/picker-constants';


@Component({
  selector: 'app-office-time',
  templateUrl: './office-time.component.html',
  styleUrls: ['./office-time.component.scss'],
})
export class OfficeTimeComponent implements OnInit {

  officeTimeForm: FormGroup;

  // NgbTimepickerConfig service to load configuartions from MY_PICKER_CONFIG
  constructor(private fb: FormBuilder,
    private config: NgbTimepickerConfig) {
    // ISSUE: direct object to object assignment was updating internal values but was not reflecting on UI
    // also the assignment done below does not work in ngOnInit
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

  // set intial values from INPUT and initialize lessThan validator
  initializePickers() {
    this.fromTime.setValue(this.getHoursMinutes(INPUT.officeFromTime));
    this.toTime.setValue(this.getHoursMinutes(INPUT.officeToTime));
    this.checkLessThan();
  }

  onSubmit() {
    console.log(this.officeTimeForm.value);
  }

  // optional functionality to calculate toTime using fromTime + officeHours
  private calcToTime() {
    return `${this.getHoursMinutes(INPUT.officeFromTime).hour + INPUT.officeHours} :
    ${this.getHoursMinutes(INPUT.officeFromTime).minute}`;
  }

  // for input "08 : 00" returns { hour : 8, minute: 0}
  private getHoursMinutes(input: string) {
    return { hour: parseInt(input.split(':')[0], 10), minute: parseInt(input.split(':')[1], 10) }
  }

  // less than validator looking for value changes
  private checkLessThan() {
    this.toTime.valueChanges.subscribe(toTime => {
      if (toTime.hour < this.fromTime.value.hour) {
        this.toTime.setErrors({ lessThanFrom: true });
      }
    });
  }

}
