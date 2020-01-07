import { Action } from '../types';
import { Profile } from '../../models';
import { ACTION_TYPES } from './actionTypes';

export interface UserProfileState {
	profile: Profile | undefined;
}

const INITIAL_STATE = {
	profile: undefined
};

export default (appState: UserProfileState = INITIAL_STATE, action: Action<Profile>) => {
	switch (action.type) {
		case ACTION_TYPES.SET_PROFILE:
			return {...appState, profile: action.payload };
		default:
			return appState;
	}
};