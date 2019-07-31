import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { minimumTimeValidator } from '../../shared/validators/minimumTimeValidator';
import { timeValidator } from '../../shared/validators/timeValidator';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MY_PICKER_CONFIG, TIME_CONSTANTS, getHourFromTime, getMinuteFromTime, getToTime } from '../../shared/constants/timerConstants';



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
      config[property] = MY_PICKER_CONFIG[property]
    });
  }

  ngOnInit() {
    this.officeTimeForm = this.officeTimeInit();
    this.setTime(TIME_CONSTANTS.officeFromTime, this.fromTime);
    this.setTime(TIME_CONSTANTS.officeToTime, this.toTime);
    this.disableSpinner();
  }


  officeTimeInit(): FormGroup {
    return this.fb.group({
      fromTime: ['', timeValidator(8, 20)],
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
    const hours = getHourFromTime(input);
    const minutes = getMinuteFromTime(input);
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


}
