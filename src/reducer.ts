import { Action } from "./action";
import {Project} from "./model-contracts/project";

export type RootState = {
  projects: Project[],
};

const initialState: RootState = {
  projects: [
    { name: "Work - Pomometer", minutesLeft: 25, tasks: [] },
    { name: "Work - IE", minutesLeft: 25, tasks: [] },
    { name: "Work - Example", minutesLeft: 100, tasks: [] }
  ]
};

export default (state = initialState, action: Action): RootState => {
  switch (action.type) {
    default:
      return state;
  }
};
