import { ISidebarData } from "./helper";

export const sidebarData: ISidebarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'workout-form',
        icon: 'fal fa-address-card',
        label: 'Workout Form'
    },
    {
        routeLink: 'workout-list',
        icon: 'fal fa-list',
        label: 'Workout List'
    },
    {
        routeLink: 'workout-progress',
        icon: 'fal fa-user-chart',
        label: 'Workout Progress'
    }
];