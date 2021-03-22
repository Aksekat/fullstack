import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS': return action.data
    case 'RESET_USERS': return null
    case 'ADD_BLOG_TO_USER': {
      const userId = action.data.userId
      const blog = action.data.blog
      const formattedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        id: blog.id
      }
      const user = state.find(u => u.id === userId)
      const updatedUser = { ...user, blogs: user.blogs.concat(formattedBlog) }
      return state.map(u => u.id !== userId ? u : updatedUser)
    }
    case 'REMOVE_BLOG_FROM_USER': {
      const userId = action.data.userId
      const blogId = action.data.blogId
      const user = state.find(u => u.id === userId)
      const updatedUser = { ...user, blogs: user.blogs.filter(b => (b.id !== blogId)) }
      return state.map(u => u.id !== userId ? u : updatedUser)
    }
    default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export const addBlogToUser = (userId, blog) => {
  return {
    type: 'ADD_BLOG_TO_USER',
    data: { userId, blog }
  }
}

export const removeBlogFromUser = (userId, blogId) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    data: { userId, blogId }
  }
}

export default reducer