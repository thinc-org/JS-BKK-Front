export type Onclick =
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;

export interface RouteData {
  hasNavbar: boolean;
  title: string;
}

export interface NestedRouteData {
  hasNavbar?: boolean;
  title?: string;
  [key: string]: any;
}
