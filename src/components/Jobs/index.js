import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import JobCard from '../JobCard'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profile: {},
    radio: '',
    checkbox: [],
    search: '',
    isLoading: true,
    isProfileFail: false,
    isJobsFail: false,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({isProfileFail: false})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const res = await fetch(url, options)

    if (res.ok) {
      const data = await res.json()
      const p = data.profile_details
      const updated = {
        name: p.name,
        shortBio: p.short_bio,
        profileImageUrl: p.profile_image_url,
      }
      this.setState({profile: updated})
    } else {
      this.setState({isProfileFail: true})
    }
  }

  getJobs = async () => {
    this.setState({isLoading: true, isJobsFail: false})
    const {radio, checkbox, search} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${checkbox.join(
      ',',
    )}&minimum_package=${radio}&search=${search}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const res = await fetch(url, options)

    if (res.ok) {
      const data = await res.json()
      this.setState({jobsList: data.jobs, isLoading: false})
    } else {
      this.setState({isLoading: false, isJobsFail: true})
    }
  }

  radio = e => {
    this.setState({radio: e.target.value}, this.getJobs)
  }

  checkbox = e => {
    // Corrected: Used object destructuring here
    const {value} = e.target

    this.setState(
      prev => {
        const exists = prev.checkbox.includes(value)
        return {
          checkbox: exists
            ? prev.checkbox.filter(i => i !== value)
            : [...prev.checkbox, value],
        }
      },
      () => {
        this.getJobs()
      },
    )
  }

  typing = e => {
    this.setState({search: e.target.value})
  }

  search = () => {
    this.getJobs()
  }

  renderProfile() {
    const {profile, isProfileFail} = this.state

    if (isProfileFail) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" onClick={this.getProfile}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="profile">
        <img
          src={profile.profileImageUrl}
          className="profile-img"
          alt="profile"
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-bio">{profile.shortBio}</p>
      </div>
    )
  }

  renderJobs() {
    const {jobsList, isLoading, isJobsFail} = this.state

    if (isLoading) {
      return (
        <div data-testid="loader" className="loader-container">
          <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
        </div>
      )
    }

    if (isJobsFail) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" onClick={this.getJobs}>
            Retry
          </button>
        </div>
      )
    }

    if (jobsList.length === 0) {
      return (
        <div className="no-job-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-job-img"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(item => (
          <li key={item.id}>
            <JobCard item={item} />
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {search} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-sub-container">
            <div className="jobs-left-container">
              {this.renderProfile()}
              <hr />

              {/* Filters */}
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="filter-list">
                {employmentTypesList.map(item => (
                  <li key={item.employmentTypeId}>
                    <div className="list-item-filter">
                      <input
                        id={item.employmentTypeId}
                        type="checkbox"
                        value={item.employmentTypeId}
                        onChange={this.checkbox}
                      />
                      <label htmlFor={item.employmentTypeId} className="label">
                        {item.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>

              <hr />

              <h1 className="filter-heading">Salary Range</h1>
              <ul className="filter-list">
                {salaryRangesList.map(item => (
                  <li key={item.salaryRangeId}>
                    <div className="list-item-filter">
                      <input
                        id={item.salaryRangeId}
                        value={item.salaryRangeId}
                        name="salaryRangeId"
                        type="radio"
                        onChange={this.radio}
                      />
                      <label htmlFor={item.salaryRangeId} className="label">
                        {item.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="jobs-right-container">
              {/* ⭐ Correct test IDs */}
              <div className="search-input">
                <input
                  type="search"
                  value={search}
                  onChange={this.typing}
                  data-testid="searchInput"
                />
                <button
                  type="button"
                  onClick={this.search}
                  data-testid="searchButton"
                >
                  Search
                </button>
              </div>

              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
