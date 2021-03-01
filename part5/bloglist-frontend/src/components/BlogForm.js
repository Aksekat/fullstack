import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>Title:
          <input id='title' type='text' value={title} name='Title' onChange={handleTitleChange}></input>
        </div>
        <div>Author:
          <input id='author' type='text' value={author} name='Author' onChange={handleAuthorChange}></input>
        </div>
        <div>URL:
          <input id='url' type='text' value={url} name='Url' onChange={handleUrlChange}></input>
        </div>
        <button id='createButton' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm