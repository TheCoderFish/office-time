import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export function timeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        if (value.hour < min) {
            return { tooEarly: true };
        }

        if (value.hour > max) {
            return { tooLate: true };
        }
        return null;
    };
}