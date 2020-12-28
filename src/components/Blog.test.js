import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Atomic Design',
    author: 'Brad Frost',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
  }

  const component = render(<Blog {...{ blog }} />)

  expect(component.container).toHaveTextContent('Atomic Design')
})
