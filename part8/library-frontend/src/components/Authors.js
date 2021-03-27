import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {

  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const authors = useQuery(ALL_AUTHORS)

  const options = authors.loading ? null : authors.data.allAuthors.map(a => {
    return { value: a.name, label: a.name }
  })

  const submit = async (event) => {
    event.preventDefault()
    const name = selectedOption.value
    const bornAsInt = parseInt(born)
    editAuthor({ variables: { name, setBornTo: bornAsInt } })
    setSelectedOption(null)
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.currentUser ?
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>name<Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            </div>
            <div>
              born
              <input
                type='number'
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type='submit'>Update author</button>
          </form>
        </>
        : null
      }

    </div>
  )
}

export default Authors
