import { CoursePart } from "../types"

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: PartProps) => {

  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h4 style={{marginBottom: 0}}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{marginTop: 0}}><i>{coursePart.description}</i></p>
        </div>
      )
    case "background":
      return (
        <div>
          <h4 style={{marginBottom: 0}}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{margin: 0}}><i style={{marginTop: 0}}>{coursePart.description}</i></p>
          <p style={{marginTop: 0}}>more info at {coursePart.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4 style={{marginBottom: 0}}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{marginTop: 0}}>project exercises {coursePart.groupProjectCount}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h4 style={{marginBottom: 0}}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p style={{margin: 0}}><i>{coursePart.description}</i></p>
          <p style={{marginTop: 0}}>required skils: {coursePart.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(coursePart)
  }

}

export default Part