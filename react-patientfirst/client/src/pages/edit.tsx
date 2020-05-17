import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import FormComponent from '../components/form';
import * as _ from 'lodash';
import SubHeader from '../components/sub_header';
import Content from '../components/content';
import Loader from '../components/loader';

// inform we match url /:id
interface IMatchParams {
    id: any;
}
interface ICreatePageProps {
    patient: any;
    updatePatient: any;
    fetchPatient: any;
    clearPatient: any;
}

class EditPage extends React.Component<RouteComponentProps<IMatchParams> & ICreatePageProps, {}> {
    public componentDidMount() {
        this.props.fetchPatient(this.props.match.params.id);
    }

    public componentWillUnmount() {
        this.props.clearPatient();
    }

    public render() {
        const { patient } = this.props;

        return <>
            <SubHeader title="Update Patient Information" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        {_.isEmpty(patient)
                            ? <Loader />
                            : <FormComponent default={patient} handle={this.submittedDataHandler} />}
                    </div>
                </div>
            </Content>
        </>
    }

    protected submittedDataHandler = async (data: any) => {
        const { updatePatient, clearPatient } = this.props;

        data = {...data, id: this.props.match.params.id}
        await updatePatient(data);

        clearPatient();

        this.props.history.push('/');
    }

}

export default withRouter(connect(
        (state: any) => ({
        patient: state.patient
    }),
    dispatch => ({
        clearPatient: bindActionCreators(actions.clearLoadedPatient, dispatch),
        fetchPatient: bindActionCreators(actions.fetchPatient, dispatch),
        updatePatient: bindActionCreators(actions.patchPatient, dispatch)
    })
)(EditPage));
