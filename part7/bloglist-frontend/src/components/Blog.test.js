import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'testUser',
  name: 'Test User',
  id: 1
}

const blog = {
  title: 'testTitle',
  author: 'Author',
  url: 'testLink',
  likes: 12,
  user: user
}

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler} />
    )
  })

  test('renders correct content when not expanded', () => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('Author')
    expect(component.container).not.toHaveTextContent('testLink')
    expect(component.container).not.toHaveTextContent('12')
  })

  test('after clicking the expand button, correct content is rendered', () => {
    const button = component.getByText('View')
    fireEvent.click(button)
    const likes = component.container.querySelector('.likes')
    expect(likes).toBeDefined()
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('Author')
    expect(component.container).toHaveTextContent('testLink')
    expect(component.container).toHaveTextContent('12')
    expect(component.container).toHaveTextContent('Test User')
  })

  test('clicking the like button twice calls the handler twice', () => {
    const expandButton = component.getByText('View')
    fireEvent.click(expandButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})