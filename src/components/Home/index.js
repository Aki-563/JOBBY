import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-text-container">
        <div className="home-text">
          <h1 className="home-heading">Find the Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the Job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="home-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)
export default Home
