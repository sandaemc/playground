import * as React from 'react';

interface ISubHeaderProps {
    title: string;
}

export default class SubHeader extends React.Component<ISubHeaderProps, {}> {
  public render() {
        return <div className="m-subheader">
            <div className="d-flex align-items-center">
                <div className="mr-auto">
                    <h3 className="m-subheader__title ">{this.props.title}</h3>
                </div>
            </div>
        </div>
    }
}