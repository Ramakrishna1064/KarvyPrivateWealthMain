import { DivInOutAnimation } from './../shared/animations/div.animation';
import { LeadsChildObject } from './../shared/objectMappers/LeadsChildObject';
import { LeadsParentObject } from './../shared/objectMappers/LeadsParentObject';
import { LeadsService } from '../shared/services/leads.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, PageEvent, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariables } from '../shared/utilities/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  animations: [DivInOutAnimation]

})
export class LeadsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'leadStatus', 'mobile', 'email', 'actions'];
  dataSource: MatTableDataSource<LeadsChildObject>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex: number;
  pageSize: number;
  length: number;
  isAdmin = true;
  selectedPath: any;
  animationState1 = 'out';
  animationState2 = 'out';

  constructor(public dialog: MatDialog, private dashBoardService: LeadsService,
    private toast: ToastrService) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // This line of code below:
    this.dataSource = new MatTableDataSource<LeadsChildObject>();
    this.getLeadsList(0);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
      this.dashBoardService.getLeadsList(data).subscribe(leadsList => {
        const leadsData: LeadsParentObject = leadsList;
        this.length = leadsData.totalElements;
        this.dataSource = new MatTableDataSource(leadsData.content);
        this.dataSource.sort = this.sort;
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

  toggleShowDiv(divName: string) {
    if (divName === 'lead') {
      this.selectedPath = 'lead';
      console.log(this.animationState1);
      this.animationState1 = this.animationState1 === 'out' ? 'in' : 'out';
      console.log(this.animationState1);
      this.animationState2 = 'out';
    } else if (divName === 'filter') {
      this.selectedPath = 'filter';
      console.log(this.animationState2);
      this.animationState2 = this.animationState2 === 'out' ? 'in' : 'out';
      console.log(this.animationState2);
      this.animationState1 = 'out';
    }
  }


  /************DIALOG PARTS***********************/
  openAddLead() {
    const dialogRef = this.dialog.open(AddLeadsComponent, {
      //width: '500px',
      data: { name: "Naresh", animal: "Krisha" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}

