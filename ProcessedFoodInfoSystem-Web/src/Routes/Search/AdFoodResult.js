import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultStyle.scss';

const AdFoodResult = ({ loading, result }) => {

  return (
    <div className='result'>
      {loading ? <div>Loading...</div> :
        <div>
          {result && result.length > 0 ?
            result.map((result, index) => (
              <div class='card'>
                <Link
                  to={{
                    pathname: `food/${result.food.foodId}`,
                    state: {
                      adId: result.id,
                    },
                  }}
                >
                  <div class='card-body'>
                    <img className='foodImg' src={result.food.foodImageAddress} />
                    <h5 class='card-title'>{result.food.foodName}</h5>
                    <p class='card-text'>{(result.food.manufacturerName).substring(0, 9)}...</p>
                  </div>
                </Link>
                <div className='bshName'>광고상품</div>
              </div>

            )) : <div>No result</div>
          }
        </div>

      }
    </div>
  );
};
export default React.memo(AdFoodResult);