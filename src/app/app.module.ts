import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodyComponent } from './layout/body/body.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { LayoutComponent } from './layout/layout.component';
import { ToastrModule } from 'ngx-toastr';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ManageWorkoutComponent } from './dashboard/manage-workout/manage-workout.component';
import { WorkoutProgressComponent } from './dashboard/workout-progress/workout-progress.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [									
    AppComponent,
    DashboardComponent,
    BodyComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    ManageWorkoutComponent,
    WorkoutProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AgGridAngular,
    AgGridModule,
    MatFormFieldModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    BaseChartDirective,
  ],
  providers: [ 
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }