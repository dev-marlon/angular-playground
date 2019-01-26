import { InjectionToken } from '@angular/core';

export interface AppConstantsInterface {
    option1: string;
    option2: boolean;
}

// Default options that can be overridden
export const AppConstants: AppConstantsInterface = {
    option1: 'Foobar',
    option2: true,
};

// Injection token to be used to override the default options for the chips module
export const APP_CONSTANTS = new InjectionToken<AppConstantsInterface>(
    'Application constants'
);
