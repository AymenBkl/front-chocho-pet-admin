import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
  username: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  country: '',
  postalCode: '',
  description: ''

};

// tslint:disable-next-line: prefer-const
let validationMessages = {
  username: {
    required: 'User name is required.',
    minlength: 'User name must be at least 4 characters long.',
    maxlength: 'User name must be at most 20 characters long.'
  },
  firstName: {
    required: 'First name is required.',
    minlength: 'First name must be at least 4 characters long.',
    maxlength: 'First name must be at most 20 characters long.'
  },
  lastName: {
    required: 'Last name is required.',
    minlength: 'Last name must be at least 4 characters long.',
    maxlength: 'Last name must be at most 20 characters long.'
  },
  address: {
    required: 'Address is required.',
    minlength: 'Address must be at least 4 characters long.',
  },
  city: {
    required: 'City is required.',
    minlength: 'City  must be at least 4 characters long.',
  },
  country: {
    required: 'Country  is required.',
    minlength: 'Country  must be at least 4 characters long.',
  },
  postalCode: {
    required: 'Zip Code  is required.',
    minlength: 'Zip Code must be at least 4 characters long.',
  },
  description: {
    required: 'Description is required.',
    minlength: 'Description must be at least 4 characters long.',
  }

};

export function onValueChanged(data: any, loginForm: FormGroup) {
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
