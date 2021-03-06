import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    APP_CONSTANTS,
    AppConstants,
    AppConstantsInterface,
} from './app.constants';
import { CancelRequestModule } from './cancel-request/cancel-request.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, CancelRequestModule],
    providers: [
        {
            provide: APP_CONSTANTS,
            // We can override this object in tests
            useValue: AppConstants as AppConstantsInterface,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
