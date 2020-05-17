import * as React from 'react';

interface IPartialFormViewProps {
  default?: IPartialFormViewState;
  action: string;
}

interface IPartialFormViewState {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date;
  gender: string;  
  address: string;
  phoneNumber: string;
}

export class PatientFormView extends React.Component<IPartialFormViewProps, IPartialFormViewState> {

  constructor(props: IPartialFormViewProps) {
    super(props);

    this.state = {
      firstName: props.default && props.default.firstName || '',
      lastName: props.default && props.default.lastName || '',
      middleName: props.default && props.default.middleName || '',
      birthDate: props.default && props.default.birthDate || new Date(),
      gender: props.default && props.default.gender || '',
      address: props.default && props.default.address || '',
      phoneNumber: props.default && props.default.phoneNumber || ''
    };
  }

  render() {
    return <form
      method="POST"
      action={this.props.action}
      className="m-form m-form--fit m-form--label-align-right">
        <div className="m-portlet__body">
          <div className="form-group m-form__group row">
            <div className="col-10 ml-auto">
              <h3 className="m-form__section">Details</h3>
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="firstName">First Name</label>
            <div className="col-7">
              <input type="text"
                defaultValue={this.state.firstName}
                className="form-control m-input" name="firstName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="lastName">Last Name</label>
            <div className="col-7">
              <input type="text"
                defaultValue={this.state.lastName}
                className="form-control m-input" name="lastName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="middleName">Middle Name</label>
            <div className="col-7">
              <input type="text"
                defaultValue={this.state.middleName}
                className="form-control m-input" name="middleName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="birthDate">Birth Date</label>
            <div className="col-7">
              <input 
              type="date" 
              name="birthDate" 
              defaultValue={this.state.birthDate.toDateString()}
              className="form-control m-input" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="gender">Gender</label>
            <div className="col-7">
              <select
                className="form-control m-input"
                name="gender"
                defaultValue={this.state.gender}>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="address">Address</label>
            <div className="col-7">
              <input type="text"
                defaultValue={this.state.address}
                className="form-control m-input" name="address" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="phoneNumber">Phone Number</label>
            <div className="col-7">
              <input type="text"
                defaultValue={this.state.phoneNumber}
                className="form-control m-input" name="phoneNumber" />
            </div>
          </div>
        </div>
        <div className="m-portlet__foot m-portlet__foot--fit">
          <div className="m-form__actions">
            <div className="row">
              <div className="col-2" />
              <div className="col-7">
                <button
                  type="submit"
                  className="btn btn-accent m-btn m-btn--air m-btn--custom">
                  <i className="flaticon-user-ok" /> &nbsp;
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    </form>
  }
}
