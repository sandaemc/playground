import * as React from 'react';
import LayoutView from '../../layout';
import Content from '../../common/content';
import SubHeader from '../../common/sub_header';
import { PatientFormView } from './_form';

export default class NewView extends React.Component<{}, {}> {
    public render() {
        return <LayoutView>
            <SubHeader title="Create New Patient" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        <PatientFormView action="/patients/create" />
                    </div>
                </div>
            </Content>
        </LayoutView>;
    }
}
