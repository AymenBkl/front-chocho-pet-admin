import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'app/interface/admin';
import { AuthService } from 'app/services/auth.service';
import { InteractionService } from 'app/services/interaction.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit,OnDestroy {

  currentUser: Admin;
  userForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: { errmsg, errcode };
  image: { imageSrc: any, file: any } = {imageSrc: null,file:null};
  @ViewChild('files') files: ElementRef;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private interactionService: InteractionService) {

  }
  
  ngOnInit() {
    this.buildUserForm();
    this.getAdmin();
  }

  ngOnDestroy(): void {
    this.interactionService.closeToast();
    this.authService.destroyAdminSub();
    this.authService.destroyPostImageSub();
  }


  getAdmin() {
    setTimeout(() => {
      this.currentUser = this.authService.user;
      this.buildUserForm();
    }, 3000)
  }

  buildUserForm() {
    if (this.currentUser) {
      this.userForm = this.formBuilder.group({
        username: [{ value: this.currentUser.username, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        firstName: [{ value: this.currentUser.firstName, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        lastName: [{ value: this.currentUser.lastName, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        address: [{ value: this.currentUser.address, disabled: this.submitted }, [Validators.required, Validators.minLength(4)]],
        city: [{ value: this.currentUser.city, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        country: [{ value: this.currentUser.country, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        postalCode: [{ value: this.currentUser.postalCode, disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        description: [{ value: this.currentUser.description, disabled: this.submitted }, [Validators.required, Validators.minLength(4)]],

      });
    }
    else {
      this.userForm = this.formBuilder.group({
        username: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        firstName: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        lastName: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        address: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4)]],
        city: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        country: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        postalCode: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        description: [{ value: '', disabled: this.submitted }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],

      });
    }
    this.userForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.userForm);
      });
  }

  updateProfile() {
    this.interactionService.confirmBox('ALERT', 'Do you want to update your profile', 'warning', 'UPDATE', 'CANCEL', '')
      .then((result: any) => {
        if (result && result.status == true) {
          this.interactionService.displayToast('Updating Profile', true, 'info');
          this.submitted = true;
          console.log(this.currentUser._id)
          this.authService.updateAdmin(this.currentUser._id, this.userForm.value)
            .then((result: any) => {
              this.submitted = false;
              this.interactionService.closeToast();
              if (result && result) {
                this.interactionService.alertMsg('SUCCESS', 'Profile Updated Successfully', 'success');
                this.currentUser = result;
                this.buildUserForm();
              }
            })
            .catch((err) => {
              this.submitted = false;
              this.interactionService.closeToast();
              this.interactionService.alertMsg('ERROR', err.errmsg, 'error');
            })
        }
        else if (result && result.status == false) {
          this.interactionService.alertMsg('CANCELED', 'OPERATION CANCELED', 'warning');
        }
      })

  }


  openImageInput() {
    this.files.nativeElement.click();
  }


  uploadImage() {
    if (this.image.imageSrc && this.image.file) {
      this.interactionService.confirmBox('ALERT', 'Do you want to update your image', 'warning', 'UPDATE', 'CANCEL', '')
        .then((result:any) => {
          if (result && result.status == true) {
            const formData = new FormData();
            console.log(this.image.file);
            formData.append('file', this.image.file);
            formData.append('adminId', this.currentUser._id);
            this.interactionService.displayToast('Uploading Image', true, 'info');
              this.submitted = true;
              console.log(this.currentUser._id)
              this.authService.postImage(formData)
                .then((result: any) => {
                  this.submitted = false;
                  this.interactionService.closeToast();
                  if (result && result) {
                    this.interactionService.alertMsg('SUCCESS', 'Image Updated Successfully', 'success');
                    this.currentUser = result;
                    this.image = {imageSrc: null,file:null};
                    this.buildUserForm();
                  }
                })
                .catch((err) => {
                  this.submitted = false;
                  this.interactionService.closeToast();
                  this.interactionService.alertMsg('ERROR', err.errmsg, 'error');
                })
          }
          else if (result && result.status == false) {
            this.interactionService.alertMsg('CANCELED', 'OPERATION CANCELED', 'warning');
          }
        })

    }
  }
  selectedImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.image.imageSrc = reader.result;
      reader.readAsDataURL(file);
      this.image.file = file;
    }
  }



}
