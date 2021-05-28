import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  toastModals: [];
  constructor(private snackBar: MatSnackBar,
              private toast: ToastrService) { }

  openSnackBar(msg:string,positionV,positionH,type:string = ''){
    this.snackBar.open(msg,type,{
      duration:5000,
      horizontalPosition:positionH,
      verticalPosition:positionV,
      panelClass:this.handleSnackBar(type),

    })
  }

  async createLoading(msg?) {
    Swal.fire({
      title: 'Loading !',
      html: msg,// add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      backdrop: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
          Swal.showLoading()
      },
  });
}

  private handleSnackBar(type: string): string {
    if (type == 'error'){
      return '#d9534f';
    }
    else if (type == 'success'){
      return '#5cb85c';
    }
    else if (type == 'warning'){
      return '#f0ad4e';
    }
    else if (type == 'info'){
      return '';
    }
    else {
      return '';
    }
  }

  confirmBox(msg:string,text:string,icon:string,confirmBtn:string,cancelBtn:string,handler) {
    return new Promise((resolve,reject) => {
      Swal.fire({
        title: msg,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancelBtn,
      }).then((result) => {
        console.log(result);
        if (result.value || result.isConfirmed) {
          resolve({status:true});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            resolve({status:false});
        }
      })
    })

  }


  alertMsg(header:string,msg:string,type) {
    Swal.fire(
      header,
      msg,
      type
    )
  }

  showValidationError(error) {
    Swal.showValidationMessage(
      `Request failed: ${error}`
    )
  }

  displayToast(msg:string,loading:boolean,type:string) {
    const Toast = Swal.mixin({
      toast: true,
      target: '#custom-target',
      position: 'bottom-start',
      showConfirmButton: false,
      className: "pos-toast-swt",
      background:this.handleSnackBar(type),
      didOpen: (toast) => {
        if (loading) Swal.showLoading();

      }
    })


    Toast.fire({
      icon: type,
      title: msg
    })
    if (!loading) {
      setTimeout(() => {
        Toast.close()
      },4000);
    }

  }

  closeToast() {
    Swal.close();

  }

  displayToaster(msg: string,type: string,title: string){
    if (type == 'success'){
      this.toast.success(msg,title)
    }
    else if (type == 'error') {
      this.toast.error(msg,title)
    }
    else if (type == 'warning') {
      this.toast.warning(msg,title)
    }
    else if (type == 'loading') {
      return this.toast.info(msg,title,{
        timeOut:60000,
        progressBar:true
      }).toastId
    }
  }
  closeToaster(id: number) {
    this.toast.clear(id);
  }

  clearAllToastr() {
    this.toast.clear();
  }
}








