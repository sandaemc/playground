import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom';


interface IFormProps {
  handle: any;
  default?: IFormState;
}

interface IFormState {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date;
  gender: string;  
  address: string;
  phoneNumber: string;
}

const updateState = <T extends string>(key: keyof IFormState, value: T) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  [key]: value
})

export default class extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = this.getInitialState(props.default)
  }

    public getInitialState = (defaultState?: IFormState) => {
    return {
      firstName: defaultState ? defaultState.firstName : '',
      lastName: defaultState ? defaultState.lastName : '',
      middleName: defaultState ? defaultState.middleName : '',
      birthDate: defaultState ? defaultState.birthDate : new Date(),
      gender: defaultState ? defaultState.gender : 'm',
      address: defaultState ? defaultState.address : '',
      phoneNumber: defaultState ? defaultState.phoneNumber : '',
    }
  }

  public render() {
    return (
      <form className="m-form m-form--fit m-form--label-align-right">
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
                value={this.state.firstName}
                onChange={this.onChangeHandler}
                className="form-control m-input" name="firstName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="lastName">Last Name</label>
            <div className="col-7">
              <input type="text"
                value={this.state.lastName}
                onChange={this.onChangeHandler}
                className="form-control m-input" name="lastName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="middleName">Middle Name</label>
            <div className="col-7">
              <input type="text"
                value={this.state.middleName}
                onChange={this.onChangeHandler}
                className="form-control m-input" name="middleName" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="birthDate">Birth Date</label>
            <div className="col-7">
              <DatePicker
                className="form-control m-input"
                name="birthDate"
                required={true}
                selected={this.state.birthDate ? moment(this.state.birthDate) : moment()}
                onChange={this.onChangeDateHandler}
              />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="gender">Gender</label>
            <div className="col-7">
              <select
                className="form-control m-input"
                name="gender"
                onChange={this.onChangeHandler}
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
                value={this.state.address}
                onChange={this.onChangeHandler}
                className="form-control m-input" name="address" />
            </div>
          </div>
          <div className="form-group m-form__group row">
            <label className="col-2 col-form-label" htmlFor="phoneNumber">Phone Number</label>
            <div className="col-7">
              <input type="text"
                value={this.state.phoneNumber}
                onChange={this.onChangeHandler}
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
                  type="reset"
                  className="btn btn-accent m-btn m-btn--air m-btn--custom"
                  onClick={this.onClickHandler}>
                  <i className="flaticon-user-ok" /> &nbsp;
                  Save
                </button>&nbsp;&nbsp;
                <Link className="btn btn-secondary m-btn m-btn--air m-btn--custom" to={'/'}>
                  <i className="flaticon-cancel" /> &nbsp;
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
        </form>
    );
  }

  protected onChangeDateHandler = (date: Date) => {
    this.setState({ birthDate: new Date(date) })

  }

  protected onChangeHandler = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => 
    this.setState(updateState(
      e.currentTarget.name as keyof IFormState, 
      e.currentTarget.value
    ));

  private onClickHandler = (e: React.FormEvent<HTMLButtonElement>) => this.props.handle(this.state);
}
