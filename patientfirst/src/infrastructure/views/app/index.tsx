import * as React from 'react';
import LayoutView from '../layout';
import Content from '../common/content';
import SubHeader from '../common/sub_header';

interface IIndexViewProps {
    patients: Array<any>;
}

export default class IndexView extends React.Component<IIndexViewProps, {}> {
    public render() {
        return <LayoutView>
            <SubHeader title="Dashboard" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                    </div>
                </div>
            </Content>
        </LayoutView>;
    }
}
