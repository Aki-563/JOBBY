import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaExternalLinkAlt} from 'react-icons/fa'
import './index.css'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

class JobDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true, isError: false})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const res = await fetch(url, options)

    if (res.ok === true) {
      const data = await res.json()
      this.setState({
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <div className="job-details-container">
        <div className="job-card">
          <div className="job-card-top">
            <div className="job-logo-container">
              <img
                src={jobDetails.company_logo_url}
                className="job-logo"
                alt="job details company logo"
              />
            </div>
            <div className="job-title-container">
              <h1 className="job-title">{jobDetails.title}</h1>
              <p className="job-card-para">*{jobDetails.rating}</p>
            </div>
          </div>

          <div className="job-card-mid">
            <div className="location-type">
              <p className="job-card-para">{jobDetails.location}</p>
              <p className="job-card-para">{jobDetails.employment_type}</p>
            </div>
            <div className="package">
              <p className="job-card-para">{jobDetails.package_per_annum}</p>
            </div>
          </div>

          <hr className="line" />

          <div className="description-container">
            <div className="des">
              <h1 className="job-title">Description</h1>
              <a
                className="link-container"
                href={jobDetails.company_website_url}
              >
                <p className="linkblue">Visit</p>
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p className="job-card-para">{jobDetails.job_description}</p>
          </div>

          <div className="skills-container">
            <h1 className="job-title">Skills</h1>
            <ul className="skills">
              {jobDetails.skills.map(item => (
                <li key={item.name} className="skill-items">
                  <img
                    src={item.image_url}
                    className="skill-img"
                    alt={item.name}
                  />
                  <p className="job-card-para">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-container">
            <h1 className="job-title">Life at Company</h1>
            <div className="life-details-container">
              <p className="job-card-para">
                {jobDetails.life_at_company.description}
              </p>
              <div className="life-img-container">
                <img
                  src={jobDetails.life_at_company.image_url}
                  className="life-img"
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="job-title">Similar Jobs</h1>
        <ul className="similar-list">
          {similarJobs.map(item => (
            <li key={item.id}>
              <SimilarJobCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, isError} = this.state

    // Logic extracted here to avoid nested ternary error
    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (isError) {
      content = this.renderFailure()
    } else {
      content = this.renderJobDetails()
    }

    return (
      <div className="job-details">
        <Header />
        {content}
      </div>
    )
  }
}

export default JobDetails
