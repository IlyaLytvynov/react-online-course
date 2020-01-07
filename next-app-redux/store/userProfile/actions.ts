import { getAccessToken } from '../auth/selectors';
import { ApiRequest } from '../../apis/ApiRequest';
import { ACTION_TYPES } from './actionTypes';
import { Profile } from '../../models';

export const fetchUserProfile = () => async (dispatch, getState) => {
	const state = getState();
	const accessToken = getAccessToken(state);
	const url = `/me`;
	const response = await ApiRequest.get<any>(url, {token: accessToken});
	dispatch(setUserProfile(response));
};

const setUserProfile = (profile: Profile) => ({
	type: ACTION_TYPES.SET_PROFILE,
	payload: profile
});