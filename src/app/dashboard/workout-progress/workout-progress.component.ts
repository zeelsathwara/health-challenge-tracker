import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { WorkoutService } from '../service/workout.service';

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css']
})

export class WorkoutProgressComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  chartData: ChartDataset<'bar'>[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Workout Types'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Minutes'
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Minutes: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };
  chartType: ChartType = 'bar';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // this.users = this.workoutService.getData();
    this.users = [
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

    if (this.users.length > 0) {
      this.selectUser(this.users[0]);
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    console.log('Selected User:', this.selectedUser); // Log selected user data
    this.updateChartData();
  }

  updateChartData() {
    if (!this.selectedUser || !this.selectedUser.workouts) {
      console.error('No workouts data available for the selected user.');
      return;
    }

    console.log('Workouts Data:', this.selectedUser.workouts);

    const workoutTypes = [...new Set(this.selectedUser.workouts.map(w => w.workout_type))] as string[];
    console.log('Workout Types:', workoutTypes); // Log workout types

    this.chartLabels = workoutTypes;

    this.chartData = [{
      label: 'Minutes',
      data: workoutTypes.map(type => {
        return this.selectedUser.workouts
          .filter(w => w.workout_type === type)
          .reduce((sum, w) => sum + w.workout_minutes, 0);
      }),
      backgroundColor: 'rgba(63, 81, 181, 0.5)',
      borderColor: 'rgba(63, 81, 181, 1)',
      borderWidth: 1
    }];

    console.log('Chart Data:', this.chartData); // Log chart data

  }
}