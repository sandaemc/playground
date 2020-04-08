import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Filter from './components/filter';
import FilteredTable from './components/filtered-table';
import { Provider } from 'react-redux';
import { configure } from './store';

const store = configure();

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Filter />
            <FilteredTable />
        </div>
    </Provider>,
    document.getElementById('price-management')
);
