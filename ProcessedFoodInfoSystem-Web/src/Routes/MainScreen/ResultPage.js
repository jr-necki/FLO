import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Search/SearchResultStyle.scss';
import StarRatings from 'react-star-ratings';


const ResultPage = ({ loading, result }) => {
useEffect(()=>{
    console.log("로딩",loading);
    console.log("결과",result);
},[]);
  return (
    <div className='result'>
      {loading ? <div>Loading...</div> :
        <div className='result__container' style={result && result.length === 0 ? {display:'block'} : {display:'grid'} }>
          {result && result.length > 0 ?
            result.map((result, index) => (
              <div className='card-body'>
                <Link className='card-link' to={`/searchProduct/food/${result.foodId}`}>
                  <img className='foodImg' src={result.foodImageAddress} />
                  <h5 className='card-title'>{result.foodName}</h5>
               
                  <StarRatings
                    rating={parseFloat(result.avgRating)}
                    starDimension='20px'
                    starSpacing='0'
                    starRatedColor={'#facd89'}
                  />
                </Link>
              </div>
            
            )) : <div>No result</div>
          }
        </div>
      }
    </div>
  );
};
export default ResultPage;