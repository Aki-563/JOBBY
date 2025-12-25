import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const logOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="header-contents">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>

        <li>
          <ul className="header-tabs-container">
            <li>
              <Link to="/" className="link">
                <p className="header-tab">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="link">
                <p className="header-tab">Jobs</p>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <button
            onClick={logOut}
            className="logout-button"
            type="button"
            data-testid="logoutButton"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
