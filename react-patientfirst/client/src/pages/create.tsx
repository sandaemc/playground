import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import FormComponent from '../components/form';
import SubHeader from '../components/sub_header';
import Content from '../components/content';

interface ICreatePageProps {
    postPatient: any;
}

class CreatePage extends React.Component<RouteComponentProps<{}> & ICreatePageProps, {}> {
    public render() {
        return <>
            <SubHeader title="Add A New Employee" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        <FormComponent handle={this.submittedDataHandler} />
                    </div>
                </div>
            </Content>
        </>
    }

    protected submittedDataHandler = async (data: any) => {
        await this.props.postPatient(data);
        this.props.history.push('/');
    }
}

export default withRouter(connect(
    null,
    dispatch => ({
        postPatient: bindActionCreators(actions.postPatient, dispatch)
    })
)(CreatePage));
