import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './ResultStyle.scss';

const AdPage = ({ loading, result }) => {
useEffect(()=>{
    console.log("로딩",loading);
    
},[]);
  return (
    <div className='result__ad'>
      {loading ? <div>Loading...</div> :
        <div className='result__container__ad'>
          {result && result.length > 0 ?
            result.map((result, index) => (
              <div className='card-body__ad'>
                <Link className='card-link__ad' to={`/searchProduct/food/${result.food.foodId}`}>
                  <img className='foodImg__ad' src={result.food.foodImageAddress} />
                  <h5 className='card-title__ad'>{result.food.foodName}</h5>
                  <h6 className='card-title__ad'> {result.food.manufacturerName.split('_')[0]}</h6>
                  <StarRatings className="star_score"
                    rating={parseFloat(result.food.reviewRate)}
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
export default AdPage;