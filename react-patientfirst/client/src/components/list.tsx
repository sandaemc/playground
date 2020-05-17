import * as React from 'react';

interface IListProps {
  patients: any[];
  onDeleteHandler: any;
  onEditHandler: any;
}

export default class extends React.Component<IListProps, {}> {
  public render() {
    return (
      <React.Fragment>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Birth Date</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.patients.map(e =>
                  <tr style={{ cursor: 'pointer' }} onClick={this.props.onEditHandler.bind(this, e.id)} key={e.id}>
                    <th scope="row">{e.id}</th>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>{e.middle_name}</td>
                    <td>{e.birth_date}</td>
                    <td>{e.gender}</td>
                    <td>{e.address}</td>
                    <td>{e.phone_number}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm font-weight-bold"
                        onClick={this.props.onDeleteHandler.bind(this, e.id)}>
                        <i className="flaticon-delete-1" /> &nbsp;
                        DELETE
                      </button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
