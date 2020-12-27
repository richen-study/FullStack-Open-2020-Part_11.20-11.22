/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

const BlogDetails = ({ blog, updateBlog, user, deleteBlog, setBlogView }) => {
  const [thisBlog, setThisBlog] = useState(blog)

  const handleBlogLike = (event) => {
    event.preventDefault()
    updateBlog({
      id: thisBlog.id,
      title: thisBlog.title,
      author: thisBlog.author,
      url: thisBlog.url,
      likes: thisBlog.likes + 1,
      user: thisBlog.user,
    })

    setBlogView((blogView) => !blogView)

    setThisBlog({
      id: thisBlog.id,
      title: thisBlog.title,
      author: thisBlog.author,
      url: thisBlog.url,
      likes: thisBlog.likes + 1,
      user: thisBlog.user,
    })
  }

  const handleBlogDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete ${thisBlog.title}?`)) {
      deleteBlog(thisBlog.id, user.token)
      setBlogView((blogView) => !blogView)
    }
    return
  }

  //Added a return for if the blog was not created by a user
  if (!thisBlog.user || user.id !== thisBlog.user.id) {
    return (
      <>
        <div>Author: {thisBlog.author}</div>
        <div>
          Likes: {thisBlog.likes} <button onClick={handleBlogLike}>like</button>
        </div>
        <div>
          Url:
          <a href={thisBlog.url}>{thisBlog.url}</a>
        </div>
      </>
    )
  }

  return (
    <>
      <div>Author: {thisBlog.author}</div>
      <div>
        Likes: {thisBlog.likes} <button onClick={handleBlogLike}>like</button>
      </div>
      <div>
        Url:
        <a href={thisBlog.url}>{thisBlog.url}</a>
      </div>
      <div>{<button onClick={handleBlogDelete}>Delete Blog</button>}</div>
    </>
  )
}
const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [blogView, setBlogView] = useState(false)

  const handleViewChange = (event) => {
    event.preventDefault()
    setBlogView((blogView) => !blogView)
  }

  if (!blogView) {
    return (
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
        }}
      >
        <div style={{ padding: '10px 10px 10px 0px' }}>
          {blog.title}
          <button style={{ margin: '10px' }} onClick={handleViewChange}>
            View Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
      }}
    >
      <div style={{ padding: '10px 10px 10px 0px' }}>
        {blog.title}
        <button style={{ margin: '10px' }} onClick={handleViewChange}>
          View Details
        </button>
      </div>
      <BlogDetails {...{ blog, user, updateBlog, deleteBlog, setBlogView }} />
    </div>
  )
}

export default Blog
