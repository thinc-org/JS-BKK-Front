export interface Schedule {
  key: number;
  title: string;
  speaker?: string;
  hours: string;
  minutes: string;
  position?: string;
  image?: string;
  url?: string | null;
  email?: string | null;
  about?: string | null;
  description?: string;
  happening: boolean;
  happened: boolean;
}
