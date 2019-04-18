import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './layout/footer/footer.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { TodayActivitiesComponent } from '../home/today-activities/today-activities.component';
import { OverDueActivitiesComponent } from '../home/over-due-activities/over-due-activities.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    TodayActivitiesComponent,
    OverDueActivitiesComponent,
    AddLeadsComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    TodayActivitiesComponent,
    OverDueActivitiesComponent,
    RouterModule
  ],
  entryComponents: [
    AddLeadsComponent
  ],
})
export class SharedModule { }
