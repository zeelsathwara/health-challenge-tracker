import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  const storageKey = 'userData';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    // Clear local storage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data to local storage', () => {
    const testData = { id: 1, name: 'Workout1' };
    spyOn(localStorage, 'setItem');
    service.saveData(testData);
    expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify(testData));
  });

  it('should retrieve data from local storage', () => {
    const testData = [{ id: 1, name: 'Workout1' }];
    localStorage.setItem(storageKey, JSON.stringify(testData));
    const data = service.getData();
    expect(data).toEqual(testData);
  });

  it('should return an empty array if no data is in local storage', () => {
    const data = service.getData();
    expect(data).toEqual([]);
  });

  it('should log an error if there is an issue saving data', () => {
    spyOn(localStorage, 'setItem').and.throwError('Simulated Error');
    spyOn(console, 'error');
    service.saveData({ id: 1, name: 'Workout1' });
    expect(console.error).toHaveBeenCalledWith('Error saving data to local storage', jasmine.any(Error));
  });

  it('should log an error if there is an issue retrieving data', () => {
    spyOn(localStorage, 'getItem').and.throwError('Simulated Error');
    spyOn(console, 'error');
    const data = service.getData();
    expect(data).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error retrieving data from local storage', jasmine.any(Error));
  });
});
