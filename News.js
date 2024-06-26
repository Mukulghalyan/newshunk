
const News=(props)=>{
    let {title , description ,images,newsUrl,author,date} = props;
    return (
      <div className="my-3">
        <div className="card">
            <img src={images} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className ="car-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More...</a>
            </div>
        </div>
      </div>
    )
  
}

export default News
