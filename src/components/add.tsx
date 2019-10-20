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
        <h1 className="h3 mb-3 font-weight-normal">Distracted</h1>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          name="distraction"
          id="inputDistraction"
          className="form-control"
          placeholder="Distraction"
          ref={register({ required: true })}
        />
        <label htmlFor="inputDistraction">
          What made you try to visit that site?
        </label>
      </div>

      <div className="form-label-group">
        <p>What's your current energy level?</p>
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
        Save Log
      </button>
    </form>
  );
}
