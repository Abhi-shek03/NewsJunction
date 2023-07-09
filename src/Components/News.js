import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,  
  }

  capatliseFisrtLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = `NewsJunction | ${this.capatliseFisrtLetter(this.props.category)}`
  }

  async updateNews(){
    try{        
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5ede75922e74b088a04ab02248fe46e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

  async componentDidMount(){
    try{        
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5ede75922e74b088a04ab02248fe46e&page=1&pageSize=${this.props.pageSize}`;
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

      HandlePrevvClick = async() =>{
        this.setState({page: this.state.page - 1})
        this.updateNews()
      }

      HandleNexxtClick = async () =>{
        this.setState({page: this.state.page + 1})
        this.updateNews()
      }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsJunction | TOP {this.capatliseFisrtLetter(this.props.category)} Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.HandlePrevvClick}>&larr; Previous</button>
        <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}className='btn btn-dark' onClick={this.HandleNexxtClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News