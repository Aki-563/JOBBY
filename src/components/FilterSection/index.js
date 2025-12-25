import './index.css'

const FilterSection = props => {
  const {item} = props
  return <p className="filter-section-text">{item.label}</p>
}
export default FilterSection
