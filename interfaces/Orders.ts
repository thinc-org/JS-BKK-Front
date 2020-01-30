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

export interface MyOrder {
  title: string;
  food: string;
  food2?: string;
  drink?: string;
  spice?: string;
  dessert?: string;
  side?: string;
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
