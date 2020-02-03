export interface Schedule {
  key: number;
  topics: string;
  speakers: string | null;
  hours: string;
  minutes: string;
  description: string | null;
  happening: boolean;
  happened: boolean;
}
