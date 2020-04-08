import * as React from 'react';

export default class Content extends React.Component<{}, {}> {
    public render() {
        return <div className="m-content">{this.props.children}</div>;
    }
}