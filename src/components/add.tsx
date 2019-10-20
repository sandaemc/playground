import React from "react";
import useForm from "react-hook-form";

interface AddComponentProps {
  onSubmit: any;
}

export function AddComponent({ onSubmit }: AddComponentProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-4">
        <h5 className="h3 mb-3 font-weight-normal">
          You tried to visit reddit.com, why?
        </h5>
      </div>

      <div className="form-label-group">
        <span className="text-muted">What's your current energy level?</span>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-light">
            Lazy
            <input type="radio" name="energyLevel" value="Low" ref={register} />
          </label>
          <label className="btn btn-light">
            Stable
            <input
              type="radio"
              name="energyLevel"
              value="Medium"
              ref={register}
            />
          </label>
          <label className="btn btn-light">
            Focused
            <input
              type="radio"
              name="energyLevel"
              value="High"
              ref={register}
            />
          </label>
        </div>
      </div>

      <br />
      <br />

      <button className="btn btn-lg btn-dark btn-block" type="submit">
        <small>SAVE</small>
      </button>
    </form>
  );
}
