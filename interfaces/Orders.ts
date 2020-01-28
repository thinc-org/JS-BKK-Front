export interface Restaurant {
  title: string;
  choices: Choice[];
  allowedChoices?: number;
}

export interface Choice {
  id: string;
  title: string;
  availability: number;
  info: string;
  customizations: Menu[];
}

export interface Menu {
  id: string;
  title: string;
  textLength?: string; // do we really need this
  allowedChoices?: number;
  choices: Food[];
}

export interface Food {
  id: string;
  title: string;
  availability?: number;
  info?: string;
}
