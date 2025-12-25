import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {item} = props
  const {
    id,
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    job_description: jobDescription,
    location,
    package_per_annum: packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="job-card">
        <div className="job-card-top">
          <div className="job-logo-container">
            <img src={companyLogoUrl} className="job-logo" alt="company logo" />
          </div>
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <p className="job-card-para">*{rating}</p>
          </div>
        </div>

        <div className="job-card-mid">
          <div className="location-type">
            <p className="job-card-para">{location}</p>
            <p className="job-card-para">{employmentType}</p>
          </div>
          <div className="package">
            <p className="job-card-para">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="line" />

        <div className="description">
          <h1 className="job-title">Description</h1>
          <p className="job-card-para">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
