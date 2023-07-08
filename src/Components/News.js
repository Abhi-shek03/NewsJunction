import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount(){
    try{        
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a5ede75922e74b088a04ab02248fe46e&page=1";
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            articles: data.articles, totalResults: data.totalResults
        });
    }
    catch(e) {
        console.log("something is not working");
    }
}

  // async componentDidMount(){
  //   let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a5ede75922e74b088a04ab02248fe46e";
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState = ({articles: parsedData.articles})
  //   console.log(parsedData)

  // }

      HandlePrevvClick = async() =>{

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a5ede75922e74b088a04ab02248fe46e&page=${this.state.page - 1}&pagrSize=20`;
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            articles: data.articles,
            page: this.state.page - 1,
        });
        }

      HandleNexxtClick = async () =>{
      if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

      }

      else {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a5ede75922e74b088a04ab02248fe46e&page=${this.state.page + 1}&pageSize=20`;
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            articles: data.articles,
            page: this.state.page + 1,
        });
        }
      }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsJunction | TOP Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.HandlePrevvClick}>&larr; Previous</button>
        <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)}className='btn btn-dark' onClick={this.HandleNexxtClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News