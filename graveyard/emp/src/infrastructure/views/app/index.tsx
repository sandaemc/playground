import * as React from 'react';
import LayoutView from '../layout';

interface IIndexViewProps {
    employees: Array<any>;
}

export default class IndexView extends React.Component<IIndexViewProps, {}> {
    public render() {
        return <LayoutView>
        </LayoutView>;
    }
}
