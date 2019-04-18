import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss']
})
export class AddLeadsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddLeadsComponent>, @Inject(MAT_DIALOG_DATA) public data: "sample") { }

  leadForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    campaign: new FormControl(''),
    leadStatus: new FormControl(''),
  });


  closeDialog(): void {
    this.dialogRef.close();
  }

  insertData(): void{
    console.log('------>'+JSON.stringify(this.leadForm.value));
  }

  ngOnInit() {

  }
}
