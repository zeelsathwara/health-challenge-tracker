import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WorkoutService } from '../service/workout.service';
import { ManageWorkoutComponent } from './manage-workout.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ManageWorkoutComponent', () => {
  let component: ManageWorkoutComponent;
  let fixture: ComponentFixture<ManageWorkoutComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['getData', 'saveData']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ ManageWorkoutComponent ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // To ignore unrecognized elements and attributes
    })
    .compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Form Initialization
  it('should initialize the form with 3 controls', () => {
    expect(component.formWorkout.contains('user_name')).toBeTrue();
    expect(component.formWorkout.contains('workout_type')).toBeTrue();
    expect(component.formWorkout.contains('workout_minutes')).toBeTrue();
  });

  // Test Dropdown Initialization
  it('should initialize dropdown settings and list', () => {
    expect(component.dropdownList1.length).toBeGreaterThan(0);
    expect(component.dropdownSettings1).toEqual({
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 4
    });
  });

  // Test Form Validation
  it('should make user_name control required', () => {
    const control = component.formWorkout.get('user_name');
    control.setValue('');
    expect(control.valid).toBeFalse();
    expect(control.errors?.required).toBeTrue();
  });

  it('should make workout_minutes control required and validate number pattern', () => {
    const control = component.formWorkout.get('workout_minutes');
    control.setValue('');
    expect(control.valid).toBeFalse();
    expect(control.errors?.required).toBeTrue();
    control.setValue('abc');
    expect(control.valid).toBeFalse();
    expect(control.errors?.pattern).toBeTrue();
  });

  it('should make workout_type control required', () => {
    const control = component.formWorkout.get('workout_type');
    control.setValue([]);
    expect(control.valid).toBeFalse();
    expect(control.errors?.required).toBeTrue();
  });

  // Test Form Submission
  it('should call saveConfigType and navigate on form submit', () => {
    const formData = {
      user_name: 'John Doe',
      workout_type: ['Running', 'Yoga'],
      workout_minutes: 30
    };

    component.formWorkout.setValue(formData);

    workoutService.getData.and.returnValue([]);
    component.saveConfigType();
    
    const expectedData = {
      user_name: 'John Doe',
      workout_type: 'Running, Yoga',
      workout_number: 2,
      workout_minutes: 30
    };

    expect(workoutService.saveData).toHaveBeenCalledWith([expectedData]);
    expect(router.navigate).toHaveBeenCalledWith(['/workout-list']);
  });

  it('should log a message if the form is invalid on submit', () => {
    spyOn(console, 'log');
    component.formWorkout.setValue({
      user_name: '',
      workout_type: [],
      workout_minutes: ''
    });

    component.saveConfigType();
    
    expect(console.log).toHaveBeenCalledWith('Form is invalid');
  });

  // Test Cancel Button Click
  it('should navigate to workout-list on cancel button click', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.secondary-button');
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/workout-list']);
  });

  // Test onGridReady
  it('should set gridApi and gridColumnApi on onGridReady', () => {
    const params = { api: 'api', columnApi: 'columnApi' };
    component.onGridReady(params);
    expect(component.gridApi).toBe('api');
    expect(component.gridColumnApi).toBe('columnApi');
  });
});
