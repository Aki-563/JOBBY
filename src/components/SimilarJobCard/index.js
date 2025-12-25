import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobCard = props => {
  const {item} = props
  const {
    id,
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    job_description: jobDescription,
    location,
    rating,
    title,
  } = item

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="similar-job-card">
        <div className="job-card-top">
          <div className="job-logo-container">
            <img
              src={companyLogoUrl}
              className="job-logo"
              alt="similar job company logo"
            />
          </div>
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <p className="job-card-para">*{rating}</p>
          </div>
        </div>

        <div className="description">
          <h1 className="job-title">Description</h1>
          <p className="job-card-para">{jobDescription}</p>
        </div>

        <div className="similar-location">
          <p className="job-card-para">{location}</p>
          <p className="job-card-para">{employmentType}</p>
        </div>
      </div>
    </Link>
  )
}

export default SimilarJobCard
