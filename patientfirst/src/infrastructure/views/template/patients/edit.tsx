import * as React from 'react';
import LayoutView from '../../layout';
import Content from '../../common/content';
import SubHeader from '../../common/sub_header';
import { PatientFormView } from './_form';

interface IEditViewProps {
    patient: any;
}

export default class EditView extends React.Component<IEditViewProps, {}> {
    public render() {
        return <LayoutView>
            <SubHeader title="Create New Employee" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        <PatientFormView 
                            default={this.props.patient} 
                            action={`/patients/update?id=${this.props.patient.id}`} />
                    </div>
                </div>
            </Content>
        </LayoutView>;
    }
}
