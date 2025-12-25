import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    isError: false,
    errorMsg: '',
  }

  TypingUsername = event => {
    this.setState({username: event.target.value})
  }

  TypingPassword = event => {
    this.setState({password: event.target.value})
  }

  submit = async e => {
    e.preventDefault()
    this.setState({isLoading: true})
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const res = await fetch(loginUrl, options)
    if (res.ok) {
      const {history} = this.props
      const data = await res.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      this.setState({
        isLoading: false,
        isError: false,
        errorMsg: '',
        username: '',
        password: '',
      })
      history.replace('/')
    } else if (res.ok === false) {
      const error = await res.json()
      this.setState({
        isLoading: false,
        isError: true,
        errorMsg: error.error_msg,
      })
    }
  }

  render() {
    const {isLoading, isError, errorMsg, username, password} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="input-container" onSubmit={this.submit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="textbox-container">
            <label htmlFor="U">USERNAME</label>
            <input
              id="U"
              type="text"
              className="textBox"
              onChange={this.TypingUsername}
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="textbox-container">
            <label htmlFor="P">PASSWORD</label>
            <input
              id="P"
              type="password"
              className="textBox"
              onChange={this.TypingPassword}
              value={password}
              placeholder="Password"
            />
          </div>
          <div className="button-container">
            <button className="login-button" type="submit">
              {isLoading ? (
                <Loader type="TailSpin" color="white" width="20" height="20" />
              ) : (
                'Login'
              )}
            </button>
            {isError ? <p className="error-text">*{errorMsg}</p> : ''}
          </div>
        </form>
      </div>
    )
  }
}
export default Login
