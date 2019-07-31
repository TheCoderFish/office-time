import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbTimepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeTimeComponent } from './employee-center/office-time/office-time.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OfficeTimeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbTimepickerModule.forRoot(),
    NgbAlertModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
