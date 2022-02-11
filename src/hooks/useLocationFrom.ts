import { useLocation } from 'react-router-dom';
import { RouterParams, RouterState } from '../types/types';

export const useLocationFrom = () => {
  const location = useLocation();
  let from: RouterParams | undefined;
  if (location.state) {
    from = (location.state as RouterState).from;
  }

  return from;
};
