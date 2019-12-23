import { LOCATION_CHANGE } from 'connected-react-router';

// Direct dispatch action for connected router,
// TODO fix this(use push method from connected router, for this time its not work)
export const navigate = (url: string) => ({
    type: LOCATION_CHANGE,
    payload: {
      location: {
        pathname: url,
      },
      action: 'POP'
    }
  }
);
