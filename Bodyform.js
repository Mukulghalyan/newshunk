import React, { useEffect ,useState } from 'react'
import News from './News'
import Loading from './Loading';
import PropTypes from 'prop-types'


const Bodyform=(props)=> {
  const[articles,setArticles]=useState([])
  const[loading,setloading]=useState([true])
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)

const updatenews=async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b2df50fbef224909a992e92799f18f08&page=1&pagesize=${props.pagesize}`;
  setloading(true)
  let data=  await fetch(url);
  let parsedData= await data.json()
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setloading(false)
}
useEffect(()=>{
   updatenews();
  },[])
const  clickkprev=async()=>{
    setPage(page-1)
    updatenews();
  }
const  clickknext= async()=>{
    if(!(page+1> Math.ceil(totalResults/props.pagesize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b2df50fbef224909a992e92799f18f08&page=${page+1}&pagesize=${props.pagesize}`;
    setloading(true)
    let data= await fetch(url);
    let parsedData= await data.json()
    setPage(page+1)
    setArticles(parsedData.articles)
    setloading(false)
  }
  
  }
  
    return (
      <div className="container my-3">
        <h2 className='text-center'>Newshunk-Top News</h2>
        {loading&&<Loading/>}
        <div className="row">
        {!loading && articles.map((element)=>{
            return <div className="col-md-4">
          
            <News key={element.url} title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,80):""} images={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/ >
            </div>

            })}

         </div>
         <div className="button d-flex justify-content-between">
          <button disabled={page<=1} type="button" class="btn btn-dark"onClick={clickkprev}>&larr;Previous</button>
          <button disabled={page+1> Math.ceil(totalResults/props.pagesize)} type="button" className="btn btn-dark" onClick={clickknext}>Next&rarr;</button>
          </div>
      </div>
    )
  
}
Bodyform.defaultProps={
  country:'in',
  pagesize:6,
  category:'general'
}

Bodyform.propTypes={
 country: PropTypes.string,
 pagesize: PropTypes.number,
 category: PropTypes.string

}
export default Bodyform
