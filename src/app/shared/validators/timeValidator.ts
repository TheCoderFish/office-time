import { ValidatorFn, AbstractControl } from '@angular/forms';

export function timeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        if (value.hour < min || value.hour > max) {
            return { invalidHours: true };
        }
        return null;
    };
}