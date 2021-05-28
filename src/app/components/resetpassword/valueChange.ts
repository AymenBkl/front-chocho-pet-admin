import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
  oldPassword: {
    required: 'Old Password is required.',
    minlength: 'Old Password must be at least 6 characters long.',
  },
  newPassword: {
    required: 'New Password is required.',
    minlength: 'New Password must be at least 6 characters long.',
    mustMatch:'Password is not matching'
  },
  confirmNewPassword: {
    required: 'Confirm New  Password is required.',
    minlength: 'Confirm New  Password must be at least 6 characters long.',
    mustMatch:'Password is not matching'
  }

};

export function onValueChanged(data: any, resetPasswordForm: FormGroup) {
  console.log(resetPasswordForm);
  if (!resetPasswordForm) { return; }
  const form = resetPasswordForm;
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
