import { AppState } from '../index';
import { Photo } from '../../models';
import { Pagination } from '../../models/Pagination';

export const getPhotos = (state: AppState): Array<Photo> => state.photos.list;
export const getPagination = (state: AppState): Pagination => state.photos.pagination;