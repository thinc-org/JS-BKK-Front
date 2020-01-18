import { Badge, BadgeType } from '../interfaces/interface.badge';

// eslint-disable-next-line import/prefer-default-export
export const authenticate = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'validtoken') {
        resolve({
          name: 'new',
          username: 'new5558',
          points: 10,
          currentBadge: { type: BadgeType.B1, owner: 'new' } as Badge,
          badges: [
            { type: BadgeType.B1, owner: 'Jotaro' },
            { type: BadgeType.B2, owner: 'Dio' },
            { type: BadgeType.B3, owner: 'Joruno' },
            { type: BadgeType.B4, owner: 'Bucharate' }
          ] as Badge[]
        });
      } else {
        reject();
      }
    }, 1000);
  });
};
