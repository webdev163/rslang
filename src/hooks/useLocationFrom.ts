import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterFrom, RouterState } from '../types/types';

export const useLocationFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from: RouterFrom | undefined;
  if (location.state) {
    from = (location.state as RouterState).from;
  }

  useEffect(() => {
    if (from) navigate(location.pathname, {});
  }, []);

  return from;
};
