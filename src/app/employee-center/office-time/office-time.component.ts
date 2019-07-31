import { Component, OnInit, OnChanges, ViewChildren, QueryList, DoCheck, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker';
import { minimumTimeValidator } from '../../shared/validators/minimumTimeValidator';

@Component({
  selector: 'app-office-time',
  templateUrl: './office-time.component.html',
  styleUrls: ['./office-time.component.scss']
})
export class OfficeTimeComponent implements OnInit, DoCheck, AfterViewChecked {

  officeTimeForm: FormGroup;
  fromTimeComponent: NgbTimepicker;
  toTimeComponent: NgbTimepicker;

  @ViewChildren(NgbTimepicker)
  pickers: QueryList<NgbTimepicker>;

  private officeFromTime: string;
  private officeToTime: string;

  // currently fixed fot hours only can be updated to use mins and secs as well
  private officeHours: number;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.officeTimeForm = this.officeTimeInit();
    this.officeFromTime = '08:00';
    this.setTime(this.officeFromTime, this.fromTime);
    this.officeHours = 10;
    this.officeToTime = this.getToTime();
    this.setTime(this.officeToTime, this.toTime);
  }

  ngDoCheck(): void {
  }

  ngAfterViewChecked(): void {
    this.fromTimeComponent = this.pickers.first;
    this.toTimeComponent = this.pickers.last;
  }

  officeTimeInit(): FormGroup {
    return this.fb.group({
      fromTime: ['', minimumTimeValidator],
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

  private getHourFromTime(input: string) {
    return parseInt(input.split(':')[0], 10);
  }

  private getMinuteFromTime(input: string) {
    return parseInt(input.split(':')[1], 10);
  }

  private getToTime() {
    return `${this.getHourFromTime(this.officeFromTime) + this.officeHours} : ${this.getMinuteFromTime(this.officeFromTime)}`;
  }


}
