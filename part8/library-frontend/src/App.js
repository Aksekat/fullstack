import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      console.log(book)
      book.genres.forEach(g => {
        const booksInStore = client.readQuery({
          query: ALL_BOOKS,
          variables: { genre: g }
        })
        if (booksInStore) client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: g },
          data: { ...booksInStore, allBooks: [...booksInStore.allBooks, book] }
        })
      })
      const booksInStore = client.readQuery({ query: ALL_BOOKS })
      client.writeQuery({
        query: ALL_BOOKS,
        data: { ...booksInStore, allBooks: [...booksInStore.allBooks, book] }
      })

      const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
      if (!authorsInStore.allAuthors.map(a => a.name).includes(book.author.name)) {
        client.writeQuery({
          query: ALL_AUTHORS,
          data: { allAuthors: authorsInStore.allAuthors.concat(book.author) }
        })
      }
    }
  })

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notification errorMessage={errorMessage} />
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => logout()}>log out</button>
      </div>
      <Notification errorMessage={errorMessage} />
      <Authors show={page === 'authors'} currentUser={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommendations show={page === 'recommendations'} />
    </div>
  )
}

export default App