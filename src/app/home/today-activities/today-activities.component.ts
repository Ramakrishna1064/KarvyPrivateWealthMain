import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DashBoardService } from 'src/app/shared/services/dashboard.service';
import { GlobalVariables } from 'src/app/shared/utilities/constants';
import { DashBoardParentObject } from 'src/app/shared/objectMappers/DahBoardParentObject';
import { HttpErrorResponse } from '@angular/common/http';
import { AddLeadsComponent } from 'src/app/add-leads/add-leads.component';
import { DashBoardChildObject } from 'src/app/shared/objectMappers/DahBoardChildObject';

@Component({
  selector: 'app-today-activities',
  templateUrl: './today-activities.component.html',
  styleUrls: ['./today-activities.component.scss']
})
export class TodayActivitiesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'address', 'actions'];
  dataSource: MatTableDataSource<DashBoardChildObject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: number;
  pageSize: number;
  length: number;
  isAdmin = true;

  constructor(public dialog: MatDialog, private dashBoardService: DashBoardService,
    private toast: ToastrService) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getTodaysActivitiesList(0);
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
  getTodaysActivitiesList(pageNumber: number) {
    //Check internet connection Avialable or not
    if (navigator.onLine) {
      const data = {
        "ownerId": localStorage.getItem(GlobalVariables.USER_ID), "pageNumber": pageNumber,
        "size": 10,
      };
      console.log("meeting request data---->" + JSON.stringify(data));
      this.dashBoardService.getTodayActivititesList(data).subscribe(leadsList => {
        console.log("todays final data---->" + JSON.stringify(leadsList));
        const leadsData: DashBoardParentObject = leadsList;
        this.length = leadsData.totalEntities!=null?leadsData.totalEntities:0;
        this.dataSource = new MatTableDataSource(leadsData.opsCallMeetingResponse!=null?leadsData.opsCallMeetingResponse:Array(0));
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
    this.getTodaysActivitiesList(event.pageIndex);
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
