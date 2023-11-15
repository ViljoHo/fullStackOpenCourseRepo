


const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  
  }


  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} />
          )}
      </div>
    )
  
  }

  const Part = (props) => {

    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  
  }

  const Total = (props) => {
    const total = props.course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    )
  
  }

  const Course = (props) => {

    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />


      </div>
    )
  }

  export default Course

  