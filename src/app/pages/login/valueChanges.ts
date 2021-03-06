import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
    username: '',
    password: '',
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
    username: {
        required: 'User name is required.',
        minlength: 'User name must be at least 4 characters long.',
        maxlength : 'User name must be at most 20 characters long.'
    },
    password : {
        required: 'Password is required.',
        minlength: 'Password must be at least 6 characters long.',
    }

};

export function onValueChanged(data: any, loginForm: FormGroup) {
    console.log(loginForm);
    if (!loginForm) { return; }
    const form = loginForm;
    for (const field in formErrors) {
        if (formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
    return formErrors;
}
