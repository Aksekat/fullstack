import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from './notificationReducer'
import { addBlogToUser, removeBlogFromUser } from './userReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'ADD_LIKE': {
      const id = action.data
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      return state.map(blog => blog.id !== id ? blog : updatedBlog)
    }
    case 'ADD_COMMENT': {
      const id = action.data.id
      const comment = action.data.comment
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(comment)
      }
      return state.map(blog => blog.id !== id ? blog : updatedBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data
      return state.filter(blog => (blog.id !== id))
    }
    case 'INIT_BLOGS':
      return action.data
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(setSuccessNotification(`${newBlog.title} added`, 5))
      dispatch(addBlogToUser(newBlog.user.id, newBlog))
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (error) {
      dispatch(setErrorNotification('Blog creation failed', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const toBeDeleted = blogs.find(b => b.id === id)
    try {
      await blogService.remove(id)
      dispatch(setSuccessNotification(`Deleted blog "${toBeDeleted.title}"`, 5))
      dispatch(removeBlogFromUser(toBeDeleted.user.id, id))
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
    } catch (error) {
      dispatch(setErrorNotification(`Deleting blog "${toBeDeleted.title}" failed`, 5))
    }
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    try {
      const returnedComment = await blogService.createComment(id, comment)
      dispatch(setSuccessNotification('Comment added', 5))
      dispatch({
        type: 'ADD_COMMENT',
        data: { id: id, comment: returnedComment }
      })
    } catch (error) {
      dispatch(setErrorNotification('Adding comment failed', 5))
    }
  }
}

export const updateLikes = (id) => {
  return async dispatch => {
    try {
      const blog = await blogService.get(id)
      blog.likes++
      const returnedBlog = await blogService.update(blog.id, blog)
      dispatch(setSuccessNotification(`Liked ${returnedBlog.title}`, 5))
      dispatch({
        type: 'ADD_LIKE',
        data: returnedBlog.id
      })
    } catch (error) {
      dispatch(setErrorNotification('Updating likes failed', 5))
    }
  }
}

export default reducer