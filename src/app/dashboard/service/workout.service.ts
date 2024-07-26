import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WorkoutService {

  private storageKey = 'userData';

  constructor() { }

  saveData(data: any): void {
    try {
      console.log('Saving Data:', data);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to local storage', error);
    }
  }

  getData(existingData?: any[]): any[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      const parsedData = data ? JSON.parse(data) : [];
      console.log('Retrieved Data:', parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error retrieving data from local storage', error);
      return [];
    }
  }

}