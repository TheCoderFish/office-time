import { FormControl } from '@angular/forms';

export function minimumTimeValidator(control: FormControl) {
    const value = control.value;

    if (!value) {
        return null;
    }

    if (value.hour < 12) {
        return { tooEarly: true };
    }

    if (value.hour > 13) {
        return { tooLate: true };
    }
    return null;
}
