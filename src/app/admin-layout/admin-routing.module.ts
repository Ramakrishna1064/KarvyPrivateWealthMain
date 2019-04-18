import { AddCustomerComponent } from './../customers/add-customer/add-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { HomeComponent } from '../home/home.component';
import { LeadsComponent } from '../leads/leads.component';
import { CallMeetingComponent } from '../call-meeting/call-meeting.component';
import { SalesClosedComponent } from '../sales-closed/sales-closed.component';
import { PotentialsComponent } from '../potentials/potentials.component';
import { CustomersComponent } from '../customers/customers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'potential', component: PotentialsComponent },
      { path: 'newCustomer', component: CustomersComponent },
      { path: 'salesClosed', component: SalesClosedComponent },
      { path: 'callMetting', component: CallMeetingComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
