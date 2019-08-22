import { SAY_HELLO } from "./constant";

export type Action = {
  type: string;
  payload?: any;
};

export const sayHello = (name: string) => ({
  type: SAY_HELLO,
  payload: `Hi ${name}`
});
