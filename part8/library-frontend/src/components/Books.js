import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  // allBooks is only used for getting all the genres and should be replaced by
  // a query allGenres
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    genre
      ? getBooks({ variables: { genre: genre } })
      : getBooks()
  }, [genre]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const genresFlattened = allBooks.data.allBooks.map(b => b.genres).flat()
  const genresUnique = [...new Set(genresFlattened)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>)}
        </tbody>
      </table>
      <div>
        {genresUnique.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books