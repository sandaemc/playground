import * as React from 'react';
import LayoutView from '../../layout';
import Content from '../../common/content';
import SubHeader from '../../common/sub_header';
import { PatientsViewModel } from '../../../view_models/patient/patients_view_model';

interface IIndexViewProps {
     vm: PatientsViewModel;
}

export default class IndexView extends React.Component<IIndexViewProps, {}> {
    public render() {
        return <LayoutView>
            <SubHeader title="Patients Dashboard" />
            <Content>
                <div className='m-portlet'>
                    <div className='m-portlet__body m-portlet__body--no-padding'>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                      { 
                                        this.props.vm.getPatients().map(e =>
                                            <tr style={{ cursor: 'pointer' }} key={e.getId()}>
                                                <th scope="row">{e.getId()}</th>
                                                <td>
                                                    <a href={`/patients/edit?id=${e.getId()}`}>
                                                        {e.getName()}
                                                    </a>
                                                </td>
                                                <td>{e.getAddress()}</td>
                                                <td>{e.getPhoneNumber()}</td>
                                                <td>{e.getGender()}</td>
                                                <td>
                                                    <form method="POST" action="/patients/delete">
                                                        <input type="hidden" name="id" value={e.getId()} />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-outline-danger btn-sm font-weight-bold">
                                                            <i className="flaticon-delete-1" /> &nbsp;
                                                            DELETE
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ) 
                                    } 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Content>
        </LayoutView>;
    }
}
