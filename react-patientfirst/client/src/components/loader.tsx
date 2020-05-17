import * as React from 'react';

export default class Loader extends React.Component<{}, {}> {
    public render() {
        return <div className="m-loader m-loader--brand" style={{width: '30px', display: 'inline-block'}} />
    }
}
