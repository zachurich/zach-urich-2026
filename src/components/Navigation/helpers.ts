import { routes } from "./constants";

export const getExternalRoutes = () => routes.filter((route) => route.external);
export const getInternalRoutes = () =>
  routes.filter((route) => !route.external && route.underConstruction !== true);
