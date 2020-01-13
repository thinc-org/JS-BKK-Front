export enum BadgeType {
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
  B5 = 'B5',
  B6 = 'B6',
  B7 = 'B7'
}

export interface Badge {
  type: BadgeType;
  owner: string;
}
