import { useRouter } from 'next/router';
import { useMemo } from 'react';
import allRoutesData from '../../utils/data.route.json';
import { RouteData } from '../../interfaces/Commons';

const defaultRouteData = {
  hasNavbar: true,
  title: 'JavaScript Bangkok 1.0.0'
};

const useRouteData = (): RouteData => {
  const router = useRouter();

  const routeData = useMemo((): RouteData => {
    const path = router.pathname;
    if (path in allRoutesData) {
      return (allRoutesData as any)[path];
    }
    return defaultRouteData;
  }, [router.pathname]);

  return routeData;
};

export default useRouteData;
