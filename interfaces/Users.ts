import { Badge } from './Badge';

// export interface UserInfo {
//   name: string;
//   username: string;
//   points: number;
//   currentBadge: Badge;
//   badges: Badge[];
// }

export interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
  referenceCode: string;
  ticketType: string;
}

export interface NetworkingProfile {
  firstname: string;
  lastname: string;
  badge: number;
  networks: Network[];
  bio: string;
}

export interface Network {
  uid: string;
  name: string;
  badge: number;
}
