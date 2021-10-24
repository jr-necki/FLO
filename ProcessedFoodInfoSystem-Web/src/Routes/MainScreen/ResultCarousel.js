import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../MainScreen/ResultCarouselStyle.scss';
import StarRatings from 'react-star-ratings';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem, Row } from 'reactstrap';


const ResultCarousel = ({ loading, result }) => {
  const items = [
    {
      id: 0,
    },
    {
      id: 3,
    },
    {
      id: 6,
    },

  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };




  useEffect(() => {
    console.log('로딩', loading);
    console.log('결과', result);
  }, []);

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <div className='ranking'>
          {loading ? <div>Loading...</div> :
            <Row className='result__container'>
              {result && result.length > 0 ?
                <>
                  <div className='card-body'>
                    <Link className='card-link' to={`/searchProduct/food/${result[item.id + 0].foodId}`}>
                      <img className='foodImg' src={result[item.id + 0].foodImageAddress} />
                      <h5 className='card-title'>{result[item.id + 0].foodName}</h5>

                      <StarRatings
                        rating={parseFloat(result[item.id + 0].avgRating)}
                        starDimension='20px'
                        starSpacing='0'
                        starRatedColor={'#facd89'}
                      />
                    </Link>
                  </div>
                  <div className='card-body'>
                    <Link className='card-link' to={`/searchProduct/food/${result[item.id + 1].foodId}`}>
                      <img className='foodImg' src={result[item.id + 1].foodImageAddress} />
                      <h5 className='card-title'>{result[item.id + 1].foodName}</h5>

                      <StarRatings
                        rating={parseFloat(result[item.id + 1].avgRating)}
                        starDimension='20px'
                        starSpacing='0'
                        starRatedColor={'#facd89'}
                      />
                    </Link>
                  </div>
                  <div className='card-body'>
                    <Link className='card-link' to={`/searchProduct/food/${result[item.id + 2].foodId}`}>
                      <img className='foodImg' src={result[item.id + 2].foodImageAddress} />
                      <h5 className='card-title'>{result[item.id + 2].foodName}</h5>

                      <StarRatings
                        rating={parseFloat(result[item.id + 2].avgRating)}
                        starDimension='20px'
                        starSpacing='0'
                        starRatedColor={'#facd89'}
                      />
                    </Link>
                  </div>
                </>
                : <div>No result</div>
              }
            </Row>
          }
        </div>
      </CarouselItem>

    );
  });

  return (
    <div className={'ResultCarousel'}>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        {/*<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />*/}
        {slides}
        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
      </Carousel>
    </div>

  );
};
export default ResultCarousel;
