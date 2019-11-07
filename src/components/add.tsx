import React from "react"
import useForm from "react-hook-form"

interface AddComponentProps {
  onSubmit: any
  distraction: string
}

const tags = [
  { name: "tired", value: "Tired" },
  { name: "bored", value: "Bored" },
  { name: "energized", value: "Energized" },
  { name: "sleepy", value: "Sleepy" },
  { name: "waiting", value: "Waiting" },
  { name: "challenged", value: "Challenged" },
  { name: "irritated", value: "Irritated" }
]

export function AddComponent({ distraction, onSubmit }: AddComponentProps) {
  const { register, handleSubmit } = useForm()

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-4">
        <h5 className="h3 mb-3 font-weight-normal">
          You tried to visit {distraction}, why?
        </h5>
      </div>

      <div className="form-label-group">
        <p className="text-muted">What's your current state?</p>

        <div className="btn-group-toggle" data-toggle="buttons">
          {tags.map((tag, idx) => (
            <label
              key={idx}
              className="btn btn-secondary"
              style={{ margin: 2 }}
            >
              {tag.value}
              <input
                type="checkbox"
                name={`tag-${idx}`}
                value={tag.name}
                ref={register}
              />
            </label>
          ))}
        </div>
      </div>

      <br />
      <br />

      <button className="btn btn-lg btn-dark btn-block" type="submit">
        <small>SAVE</small>
      </button>
    </form>
  )
}
