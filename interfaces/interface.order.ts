export interface Order {
  key: number;
  title: string;
  merchant: string;
  genres: string[];
  allergics?: string[];
}
