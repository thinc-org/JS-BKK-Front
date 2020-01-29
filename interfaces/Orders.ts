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
  textLength?: string;
  allowedChoices?: number;
  choices: Food[];
}

export interface Food {
  id: string;
  title: string;
  availability?: number;
  info?: string;
}

export interface CurrentMenuContext {
  orderFood: (orderData: Choice) => void;
}
