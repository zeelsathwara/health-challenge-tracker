import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutManagementComponent } from './dashboard/workout-management/workout-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ManageWorkoutComponent } from './dashboard/manage-workout/manage-workout.component';
import { WorkoutProgressComponent } from './dashboard/workout-progress/workout-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: LayoutComponent,
    children: [
      { 
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'workout-list', component: WorkoutManagementComponent
      },
      {
        path: 'workout-form', component: ManageWorkoutComponent
      },
      {
        path: 'workout-progress', component: WorkoutProgressComponent
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }