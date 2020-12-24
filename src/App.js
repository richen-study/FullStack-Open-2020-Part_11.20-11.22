import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={{ color: color }}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState('green')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username or Password')
      setErrorColor('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorColor('green')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    if (user) {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setUsername('')
      setPassword('')
    }
  }

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const blogObj = {
      name: user.name,
      title: title,
      author: author,
      url: url,
    }

    const returnedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage(`A new blog ${blogObj.title} added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
    </form>
  )

  const blogsInfo = () => (
    <div>
      <h2>Blogs App</h2>
      <div>{user.name} logged in </div>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleBlogCreate}>
        title:
        <input
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        author:
        <input
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        url:
        <input
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit" onClick={handleBlogCreate}>
          create
        </button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} color={errorColor} />
      {user === null ? loginForm() : blogsInfo()}
    </div>
  )
}

export default App
