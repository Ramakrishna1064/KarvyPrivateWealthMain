import { CallMettingParentObject } from './../shared/objectMappers/CallMettingParentObject';
import { CallMettingChildObject } from './../shared/objectMappers/CallMettingChildObject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariables } from '../shared/utilities/constants';
import { ToastrService } from 'ngx-toastr';
import { CallMettingService } from '../shared/services/callMetting.service';

@Component({
  selector: 'app-call-meeting',
  templateUrl: './call-meeting.component.html',
  styleUrls: ['./call-meeting.component.scss']
})
export class CallMeetingComponent implements OnInit {

  displayedColumns: string[] = ['name', 'callStatus', 'mobile', 'leadOwner', 'actions'];
  dataSource: MatTableDataSource<CallMettingChildObject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: number;
  pageSize: number;
  length: number;
  isAdmin = true;

  constructor(public dialog: MatDialog, private callMettingService: CallMettingService,
    private toast: ToastrService) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getMettingList(0);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }


  /**
   * getLeadsList
   */
  getMettingList(pageNumber: number) {
    //Check internet connection Avialable or not
    if (navigator.onLine) {
      const data = {
        "ownerId": localStorage.getItem(GlobalVariables.USER_ID),
        "name": "", "createdFromDate": "", "createdToDate": "",
        "pageNumber": pageNumber, "size": 10, "campaignId": 0, "leadName": ""
      };
      console.log("meeting request data---->" + JSON.stringify(data));
      this.callMettingService.getCallMettingList(data).subscribe(leadsList => {
        const leadsData: CallMettingParentObject = leadsList;
        this.length = leadsData.totalElements;
        this.dataSource = new MatTableDataSource(leadsData.content);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error instanceof ErrorEvent) {
          this.dataSource = new MatTableDataSource(Array(0));
          this.toast.error(errorResponse.error.message, "Client Error!");
        } else {
          this.dataSource = new MatTableDataSource(Array(0));
          this.toast.error(errorResponse.error.message, "Server Error!");
        }
      });
    } else {
      this.dataSource = new MatTableDataSource(Array(0));
      this.toast.error(GlobalVariables.CHECK_INTERNET_CONNECTION, "Fail!");
    }
  }

  /**
   * getServerData
   * @param event 
   */
  public getServerData(event?: PageEvent) {
    console.log("page index---->" + event.pageIndex);
    this.getMettingList(event.pageIndex);
  }

  /**
   * 
   * @param element 
   */
  edit(element) {
    //alert("action--->" + element);
  }

  /**
   * 
   * @param element 
   */
  potential(element) {
    let object = JSON.parse(JSON.stringify(element));
    //alert("action--->" + object.date);
  }

  selectedRow(element) {
    // alert("row--->" + element);
  }


  /************DIALOG PARTS***********************/
  openAddLead() {
    const dialogRef = this.dialog.open(AddLeadsComponent, {
      width: '500px',
      data: { name: "Naresh", animal: "Krisha" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
