import { Action } from "./action";
import {Project} from "./models/project";

export type RootState = {
  projects: Project[],
};

const initialState: RootState = {
  projects: [
  ]
};

export default (state = initialState, action: Action): RootState => {
  switch (action.type) {
    default:
      return state;
  }
};
