import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbTimepickerConfig, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
    NgbTimepickerModule.forRoot()
  ],
  providers: [NgbTimepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
