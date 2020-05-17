import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ListComponent from '../components/list';
import SubHeader from '../components/sub_header';
import Content from '../components/content';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IListPageProps {
    patients: any[];
    fetchPatients: any;
    deletePatient: any;
}

class ListPage extends React.Component<RouteComponentProps<{}> & IListPageProps, {}> {
    public componentDidMount() {
        this.props.fetchPatients();
    }

    public render() {
        const { patients } = this.props;

        return <>
            <SubHeader title="Dashboard" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        <ListComponent patients={patients} onDeleteHandler={this.onDeleteHandler} onEditHandler={this.onEditHandler} />
                    </div>
                </div>
            </Content>
        </>;
    }

    public onDeleteHandler = (id: number, e: React.FormEvent<HTMLButtonElement>) => {
        if (window.confirm('Are you sure you want to delete?')) { this.props.deletePatient(id) };
        e.stopPropagation();
    }

    public onEditHandler = (id: number) => {
        this.props.history.push(`/edit/${id}`);
    }
}

export default withRouter(connect(
    (state: any) => ({
        patients: state.patients
    }),
    dispatch => ({
        fetchPatients: bindActionCreators(actions.fetchPatients, dispatch),
        deletePatient: bindActionCreators(actions.deletePatient, dispatch)
    })
)(ListPage));
