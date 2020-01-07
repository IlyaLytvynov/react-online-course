import { AppState } from '../index';

export const getUserName = (state: AppState) => state.userProfile.profile ? state.userProfile.profile.username : '';