import { useRouter } from 'next/router';
import { useMemo } from 'react';
import allRoutesData from '../../utils/data.route.json';
import { RouteData } from '../../interfaces/interface.commons';

const defaultRouteData = {
  hasNavbar: true,
  title: 'Bangkok JS'
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
