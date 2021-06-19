import { Component, OnInit } from '@angular/core';
import { BackupandrestoreService } from 'app/services/backupandrestore.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-backupandrestore',
  templateUrl: './backupandrestore.component.html',
  styleUrls: ['./backupandrestore.component.css']
})
export class BackupandrestoreComponent implements OnInit {
  files:any[] = [];
  constructor(private backService: BackupandrestoreService,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.interactionService.createLoading('Loading Files From Google Drive Please Wait !');
    this.backService.getFiles()
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result.status == 200 && result.success == true) {
          this.interactionService.displayToaster('Files Loadded Successfully','success','Loaded');
          this.files = result.data;
        }
        else {
          this.interactionService.displayToaster(result.err,'error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.interactionService.displayToaster(err.err,'error','ERROR');
      })
  }

  submitRestore(fileId:string,fileName:string){
    this.interactionService.confirmBox('ALERT','Do You Want To Restore Database','warning','RESTORE','CANCEL','')
       .then((result:any) => {
          if (result && result.status == true){
            this.submitRestoreFinal(fileId,fileName);
          }
          else {
            console.log('nothing')
          }
       })
       .catch((err) => {

       })
  }

  submitRestoreFinal(fileId:string,fileName:string){
    let id = this.interactionService.displayToaster('Submiting Restore Please Wait !','loading','RESTORE' );
    this.backService.restoreDataBase(fileId,fileName)
      .then((result:any) => {
        this.interactionService.closeToaster(id);
        if (result && result.status == 200 && result.success){
          this.interactionService.displayToaster(result.msg,'success','RESTORED');
        }
        else {
          this.interactionService.displayToaster(result.err,'error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.displayToaster(err.err,'error','ERROR');
      })
  }

  makeBackUpBox(){
    this.interactionService.confirmBox('ALERT','Do You Want To Back Up Your Database ','warning','BACKUP','CANCEL','')
    .then((result:any) => {
       if (result && result.status == true){
         this.makeBackUp();
       }
       else {
         console.log('nothing')
       }
    })
    .catch((err) => {

    })
  }

  makeBackUp(){

  }

}
