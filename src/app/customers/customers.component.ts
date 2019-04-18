import { CustomerParentObject } from './../shared/objectMappers/CustomerParentObject';
import { CustomerChildObject } from './../shared/objectMappers/CustomerChildObject';
import { CustomerService } from './../shared/services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariables } from '../shared/utilities/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'leadStatus', 'mobile', 'email', 'actions'];
  dataSource: MatTableDataSource<CustomerChildObject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: number;
  pageSize: number;
  length: number;
  isAdmin = true;

  constructor(public dialog: MatDialog, private customerService: CustomerService,
    private toast: ToastrService) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getLeadsList(0);
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
  getLeadsList(pageNumber: number) {
    //Check internet connection Avialable or not
    if (navigator.onLine) {
      const data = {
        'ownerId': localStorage.getItem(GlobalVariables.USER_ID),
        'page': pageNumber, 'size': 10
      }
      console.log("request data---->" + JSON.stringify(data));
      this.customerService.getCustomersList(data).subscribe(leadsList => {
        const leadsData: CustomerParentObject = leadsList;
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
    this.getLeadsList(event.pageIndex);
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
