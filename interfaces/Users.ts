import { Badge } from './Badge';

export interface UserInfo {
  name: string;
  username: string;
  points: number;
  currentBadge: Badge;
  badges: Badge[];
}
