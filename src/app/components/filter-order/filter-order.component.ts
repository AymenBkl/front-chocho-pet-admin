import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.css']
})
export class FilterOrderComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  now :any = new Date();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {priceHigh:number,priceMin:number,dateCreateMAx:string,dateCreateMin:string,quantityMax:number,quantityMin:number},
  public dialogRef: MatDialogRef<FilterOrderComponent>) { }

  ngOnInit(): void {
    this.now.setDate(this.now.getDate() + 1);
    this.now = this.now.toISOString();
    this.range.patchValue(
      {
        start:this.data.dateCreateMin,
        end: this.data.dateCreateMAx
      }
    )
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  applyFilter(){
    this.data.dateCreateMAx = new Date(this.range.value.end).toISOString();
    this.data.dateCreateMin = new Date(this.range.value.start).toISOString();
    this.dialogRef.close(this.data);
  }

}
