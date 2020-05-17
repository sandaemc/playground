import * as React from 'react';
import './app.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ListPage from './list';
import CreatePage from './create';
import HeaderComponent from '../components/header';
import EditPage from './edit'

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderComponent />
          <div className="m-grid__item m-grid__item--fluid  m-grid m-grid--ver-desktop m-grid--desktop m-container m-container--responsive m-container--xxl m-page__container m-body">
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
              <Route path="/" exact={true} component={ListPage} />
              <Route path="/create" component={CreatePage} />
              <Route path="/edit/:id" exact={true} component={EditPage} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
