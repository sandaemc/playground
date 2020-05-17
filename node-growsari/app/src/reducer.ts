import { Action } from "./action";

export type RootState = {};

const initialState: RootState = {};

export default (state = initialState, action: Action): RootState => {
  switch (action.type) {
    default:
      return state;
  }
};
