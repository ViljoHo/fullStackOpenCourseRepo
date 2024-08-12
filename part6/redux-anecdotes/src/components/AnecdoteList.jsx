import { useDispatch, useSelector } from "react-redux"
import { increaceVotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    dispatch(increaceVotes(id))
    dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.slice().sort((a, b) => b.votes - a.votes ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList