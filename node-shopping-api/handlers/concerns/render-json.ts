import { ViewInterface } from '../views/view-inteface'

export function renderJSON(view: ViewInterface) {
  return {
    statusCode: 200,
    body: JSON.stringify(view.render())
  }
}
