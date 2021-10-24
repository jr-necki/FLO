import React, { useState } from 'react';
import './MainScreenStyle.scss';

import {
  Row,
  Container,
  Col,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import 간식 from '../../image/bigCategoryImg/간식.jpg';
import 기타 from '../../image/bigCategoryImg/기타.jpg';
import 김치 from '../../image/bigCategoryImg/김치.jpg';
import 농수산물 from '../../image/bigCategoryImg/농수산물.jpg';
import 유제품 from '../../image/bigCategoryImg/유제품.jpg';
import 조미료 from '../../image/bigCategoryImg/조미료.jpg';
import 즉석조리식품 from '../../image/bigCategoryImg/즉석조리식품.jpg';
import 차음료 from '../../image/bigCategoryImg/차음료.jpg';
import 육류 from '../../image/bigCategoryImg/육류.jpg';
import 식재료 from '../../image/bigCategoryImg/식재료.jpg';

import mainAd2 from '../../image/ad/mainAd2.jpg';
import mainAd3 from '../../image/ad/mainAd3.jpg';
import mainAd4 from '../../image/ad/mainAd4.jpg';

import AdPage from './AdPage';

import { getProductRanking, getAd } from '../../api';
import { useEffect } from 'react/cjs/react.development';
import ResultPage from './ResultPage';
import {FiArrowRightCircle} from 'react-icons/fi';
import {FaRegThumbsUp} from 'react-icons/fa';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import ResultCarousel from './ResultCarousel';

const MainScreen=()=> {
  const [result, setResult] = useState(null);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adLoad, setAdLoad] = useState(true);
  let result3=[];
 

  //광고
  const items = [
  {
    src: mainAd2,
    key: '1'
  },
  {
    src: mainAd3,
    key: '2'
  },
  {
    src:mainAd4,
    key: '3'
  }
];
 //광고부분
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
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  const updateProductRanking = async () => {
    await getProductRanking
      .mainPage()
      .then((response) => {
        setResult(response.data);
        setLoading(false);
        console.log(result);
        result3=result.slice(0,3);
        console.log("인기상품3개",result3);
      })
      .catch((e) => {
        console.log(e);
      });
    await getAd
      .atMainPage()
      .then((response) => {
        setAd(response.data);
        setAdLoad(false);
        console.log("광고",ad);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    updateProductRanking();
    // 메인 진입시 검색 관련 세션 초기화
    sessionStorage.removeItem('categoryName');
    sessionStorage.removeItem('selectedPage');
    sessionStorage.removeItem('selectedSort');
    sessionStorage.removeItem('selectedOption');
    sessionStorage.removeItem('allergyList')
    sessionStorage.removeItem('allergyCheck')
    sessionStorage.removeItem('searchTerm');

  }, []);

  return (
    <div className='mainScreen'>
      <br />
      <br />
      <Container>

         <div>
          <Row className="big__name">
            <Col md='11'>
              <p className='titleBar'>광고 상품</p>
            </Col>
          </Row>
          <hr className="divide__line" />
          <div className="ad__section">
            <div className="ad__intro">
              <div className="intro__title">kati 추천 광고</div>
            
              <div className="keyword__buttons">
                <div className="intro__keyword"><FaRegThumbsUp/> 추천 키워드</div>
              <Link to='/category/snack'><button className="keyword__btn">#과자</button></Link> 
               <Link to='/category/mealKit'><button className="keyword__btn">#즉석조리식품</button></Link>
               <Link to='/category/tea'><button className="keyword__btn">#커피</button></Link> 
               <Link to='/category/snack'><button className="keyword__btn">#달달한거</button></Link>
         
              </div>
            </div>
            <div className="ad__img">
              <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators interval="1000" items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
            <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
          </Carousel>
            </div>
            <div className="ad__items">
              <div className="ad__item">
                    <AdPage loading={adLoad} result={ad}/>
              </div>
              <div className="ad__item">
                    <ResultCarousel loading={loading} result={result}/>
              </div>
            
            </div>

          </div>

        </div>
        <div className="category__section">
            <Row className="category__row">
              <Col md='11'>
                <p className='titleBar'>카테고리</p>
              </Col>
            </Row>
           <hr className="divide__line" />
            <div className='category__items'>
          <div className='item' >
            <Link to='/category/snack'>
            <figure class="snip1384">
                  <img src={간식} alt="sample83" />
                  <figcaption>
                    <h3>간식</h3>
                    <p>과자/떡/빵/사탕.껌.젤리/아이스크림/초콜릿</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          </div>

           <div className='item' >
            <Link to='/category/tea'>
               <figure class="snip1384">
                  <img src={차음료} alt="sample83" />
                  <figcaption>
                    <h3>차/음료</h3>
                    <p>음료/커피/커피.차 </p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
         
          </div>

          <div className='item'>
            <Link to='/category/milk' name={'유제품'}>
               <figure class="snip1384">
                  <img src={유제품} alt="sample83" />
                  <figcaption>
                    <h3>유제품</h3>
                    <p>유제품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/meat' name={'육류'}>
               <figure class="snip1384">
                  <img src={육류} alt="sample83" />
                  <figcaption>
                    <h3>육류</h3>
                    <p>육류/햄.소시지</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
        
          </div>
          <div className='item'>
            <Link to='/category/material' name={'식재료'}>
               <figure class="snip1384">
                  <img src={식재료} alt="sample83" />
                  <figcaption>
                    <h3>식재료</h3>
                    <p>국수/두부/식용유/어묵</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/food' name={'농수산물'}>
             <figure class="snip1384">
                  <img src={농수산물} alt="sample83" />
                  <figcaption>
                    <h3>농수산물</h3>
                    <p>계란/과일.채소/김/수산물/견과/곡류</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
            
          </div>
          <div className='item'>
            <Link to='/category/con' name={'조미료'}>
              <figure class="snip1384">
                  <img src={조미료} alt="sample83" />
                  <figcaption>
                    <h3>조미료</h3>
                    <p>설탕/소금/소스/장류</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/kimchi' name={'김치'}>
              <figure class="snip1384">
                  <img src={김치} alt="sample83" />
                  <figcaption>
                    <h3>김치</h3>
                    <p>김치/젓갈</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
        
          </div>
          <div className='item'>
            <Link to='/category/mealKit' name={'즉석조리식품'}>
                <figure class="snip1384">
                  <img src={즉석조리식품} alt="sample83" />
                  <figcaption>
                    <h3>즉석조리식품</h3>
                    <p>즉석조리식품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>

            </Link>
          </div>
          <div className='item'>
            <Link to='/category/etc' name={'기타가공품'}>
                <figure class="snip1384">
                  <img src={기타} alt="sample83" />
                  <figcaption>
                    <h3>기타가공품</h3>
                    <p>기타가공품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
     
          </div>
        </div> 
      </div>
        <div>
          <Row>
            <Col md='11'>
              <p className='titleBar'>인기 상품</p>
            </Col>
          </Row>
          <hr className="divide__line" />
       <ResultPage loading={loading} result={result}/>
        </div>
      </Container>
    </div>
  );
}

export default MainScreen;
