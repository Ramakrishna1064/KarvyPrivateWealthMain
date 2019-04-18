import { SalesClosedService } from './../shared/services/salesclosed.service';
import { SalesParentObject } from './../shared/objectMappers/SalesParentObject';
import { CallMettingParentObject } from './../shared/objectMappers/CallMettingParentObject';
import { CallMettingChildObject } from './../shared/objectMappers/CallMettingChildObject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariables } from '../shared/utilities/constants';
import { ToastrService } from 'ngx-toastr';
import { CallMettingService } from '../shared/services/callMetting.service';
import { SalesChildObject } from '../shared/objectMappers/SalesChildObject';

@Component({
  selector: 'app-sales-closed',
  templateUrl: './sales-closed.component.html',
  styleUrls: ['./sales-closed.component.scss']
})
export class SalesClosedComponent implements OnInit {
  displayedColumns: string[] = ['name', 'Potential Owner', 'Crated By', 'Product Name', 'Amount', 'actions'];
  dataSource: MatTableDataSource<SalesChildObject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: number;
  pageSize: number;
  length: number;
  isAdmin = true;

  constructor(public dialog: MatDialog, private salesClosedService: SalesClosedService,
    private toast: ToastrService) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getSalesClosedList(0);
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
  getSalesClosedList(pageNumber: number) {
    //Check internet connection Avialable or not
    if (navigator.onLine) {
      const data = {
        "ownerId": localStorage.getItem(GlobalVariables.USER_ID), "page": pageNumber, "size": 10, "fromAmount": "",
        "toAmount": "", "createdFromDate": "", "createdToDate": "", "fromClosureDate": "",
        "toClosureDate": "", "campaignId": 0, "productId": 0, "masterCompanyId": 0
      };
      console.log("meeting request data---->" + JSON.stringify(data));
      this.salesClosedService.getSalesClosedList(data).subscribe(leadsList => {
        const leadsData: SalesParentObject = leadsList;
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
    this.getSalesClosedList(event.pageIndex);
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
