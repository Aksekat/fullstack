import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <p>books in your favorite genre
        <b> {user.data.me.favoriteGenre}</b>
      </p>
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
          {books.data.allBooks.map(b => {
            return (b.genres.includes(user.data.me.favoriteGenre)
              ? <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
              : null
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations