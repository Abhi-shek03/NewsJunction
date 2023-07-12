import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
          <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>
            <img src={imageUrl?imageUrl:'https://dtnext-prod.s3.ap-south-1.amazonaws.com/h-upload/2023/07/08/747226-article215189.jpg'} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title} </h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
    );
  }


export default NewsItem;
