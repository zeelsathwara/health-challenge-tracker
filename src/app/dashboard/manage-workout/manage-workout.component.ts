import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from '../service/workout.service';

interface WorkoutType {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'app-manage-workout',
  templateUrl: './manage-workout.component.html',
  styleUrls: ['./manage-workout.component.css']
})

export class ManageWorkoutComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  formWorkout!: FormGroup;
  pageTitle: string = 'Add';
  isVisible = true;
  isDisabled = false;

  dropdownList1: WorkoutType[] = [];
  dropdownSettings1 = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.dropdownList1 = [
      { item_id: 1, item_text: 'Running' },
      { item_id: 2, item_text: 'Swimming' },
      { item_id: 3, item_text: 'Cycling' },
      { item_id: 4, item_text: 'Yoga' },
    ];

    this.dropdownSettings1 = {
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 4
    };
  }

  initializeForm() {
    this.formWorkout = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      workout_minutes: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Ensure only digits
      workout_type: [[], [Validators.required]],
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  saveConfigType() {
    if (this.formWorkout.valid) {
      const formData = this.formWorkout.value;
      const workoutTypeString = Array.isArray(formData.workout_type) ? formData.workout_type.join(', ') : formData.workout_type;

      const newData = {
        user_name: formData.user_name,
        workout_type: workoutTypeString,
        workout_number: formData.workout_type.length,
        workout_minutes: formData.workout_minutes
      };

      console.log('New Data to Save:', newData);

      let existingData = this.workoutService.getData() || [];
      console.log('Existing Data from Storage:', existingData);

      const existingIndex = existingData.findIndex((data: any) => data.user_name === newData.user_name);
      if (existingIndex > -1) {
        existingData[existingIndex] = newData;
      } else {
        existingData.push(newData);
      }

      console.log('Data After Modification:', existingData);

      this.workoutService.saveData(existingData);

      this.router.navigate(['/workout-list']);
    } else {
      console.log('Form is invalid');
    }
  }

  onCancelClick() {
    this.router.navigate(['/workout-list']);
  }
}