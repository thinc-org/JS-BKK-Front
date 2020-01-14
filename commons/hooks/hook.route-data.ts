import { useRouter } from 'next/router';
import { useMemo } from 'react';
import allRoutesData from '../../utils/data.route.json';
import { RouteData } from '../../interfaces/interface.commons';

const useRouteData = (): RouteData | null => {
  const router = useRouter();

  const routeData = useMemo(() => {
    const path = router.pathname;
    if (!path) return null;
    return (allRoutesData as any)[path] as RouteData;
  }, [router.pathname]);

  return routeData;
};

export default useRouteData;
