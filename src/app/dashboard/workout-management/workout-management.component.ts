import { Component, OnInit } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { WorkoutService } from "../service/workout.service";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

@Component({
  selector: "app-workout-management",
  styleUrls: ['./workout-management.component.css'],
  standalone: true,
  imports: [AgGridAngular, HttpClientModule],
  template: `
  <section class="searchadd-section">
    <form>
        <div class="row">
            <div class="col-6">
                <div class="form-group has-search">
                    <input type="text" class="form-control" (keydown)="onKeyPress($event)" formControlName="search"
                        placeholder="Search...">
                    <span class="fa fa-search form-control-feedback"></span>
                </div>
            </div>
            <div class="col-6">
                <div class="button-div">
                    <a (click)="onAddClick()" class="site-button"><i class="fa fa-plus"></i>&nbsp;&nbsp; Add
                        Workout</a>
                </div>
            </div>
        </div>
    </form>
</section>
<ag-grid-angular
  style="width: 100%; height: 60%;"
  [columnDefs]="columnDefs"
  [rowData]="rowData"
  [defaultColDef]="defaultColDef"
  [class]="themeClass"
  (gridReady)="onGridReady($event)"
  [rowSelection]="rowSelection"
  [suppressRowClickSelection]="true"
  [pagination]="true"
  [paginationPageSize]="paginationPageSize"
  [paginationPageSizeSelector]="paginationPageSizeSelector"
></ag-grid-angular>`,
})

export class WorkoutManagementComponent implements OnInit {

  form!: FormGroup;

  public columnDefs: ColDef[] = [
    { field: "user_name", headerName: "Name", minWidth: 170 },
    { field: "workout_type", headerName: "Workouts" },
    { field: "workout_number", headerName: "Number of Workouts" },
    { field: "workout_minutes", headerName: "Total Workout Minutes" },
  ];

  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 5;
  public paginationPageSizeSelector: number[] | boolean = [5, 10, 25, 50];
  public rowData: any[] = []; 
  public themeClass: string = "ag-theme-quartz";

  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    const rawData = this.workoutService.getData();
    console.log("Raw Data:", rawData); 
    this.rowData = rawData; 
  }

  addWorkout(newWorkout: any): void {
    const existingWorkouts = this.workoutService.getData();
    existingWorkouts.push(newWorkout);
    this.workoutService.saveData(existingWorkouts);
    this.loadWorkouts(); 
  }

  userData = [
    {
      id: 1,
      user_name: 'John Doe',
      workouts: [
        { workout_type: 'Running', workout_minutes: 30 },
        { workout_type: 'Cycling', workout_minutes: 45 }
      ]
    },
    {
      id: 2,
      user_name: 'Jane Smith',
      workouts: [
        { workout_type: 'Swimming', workout_minutes: 60 },
        { workout_type: 'Running', workout_minutes: 20 }
      ]
    },
    {
      id: 3,
      user_name: 'Mike Johnson',
      workouts: [
        { workout_type: 'Yoga', workout_minutes: 50 },
        { workout_type: 'Cycling', workout_minutes: 40 }
      ]
    }
  ];
  
  onGridReady(params: GridReadyEvent<any>) {
    params.api.sizeColumnsToFit();
  }

  onKeyPress(event: KeyboardEvent) {
    // Implement search functionality if needed
  }

  onAddClick() {
    this.router.navigate(['/manage-workout']);
  }

}