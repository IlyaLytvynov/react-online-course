import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export default (history: History): any => (connectRouter(history));
export * from './actions';
