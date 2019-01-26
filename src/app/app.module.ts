import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONSTANTS, AppConstants, AppConstantsInterface } from './app.constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      {
          provide: APP_CONSTANTS,
          // We can override this object in tests
          useValue: AppConstants as AppConstantsInterface
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
