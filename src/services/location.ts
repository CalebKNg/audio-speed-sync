import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { setTracking, updateLocation } from '../store/slices/locationSlice';
import { store } from '../store/store';

const LOCATION_TASK_NAME = 'background-location-task';

export const startLocationTracking = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 1,
                foregroundService: {
                    notificationTitle: 'Tracking speed',
                    notificationBody: 'Your speed is being tracked',
                },
            });
        }
    }
    store.dispatch(setTracking(true));
}


TaskManager.defineTask(
    LOCATION_TASK_NAME,
    async ({ data, error }: TaskManager.TaskManagerTaskBody<{ locations: Location.LocationObject[] }>) => {
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            const { locations } = data;
            store.dispatch(updateLocation(locations[0]));
        }
    }
);


export const stopLocationTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    store.dispatch(setTracking(false));
};