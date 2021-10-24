import React, { useEffect, useRef, useState } from 'react';
import { foodDetailApi, getReviewRankingApi } from '../../api';
import {
  Button,
  Card,
  CardText, CardTitle,
  Col,
  Row, Table,
} from 'reactstrap';
import { AiFillStar, AiOutlineStar, FaTrophy } from 'react-icons/all';
import { Link } from 'react-router-dom';
import first from '../../image/Ranking/first.png';
import second from '../../image/Ranking/second.png';
import third from '../../image/Ranking/third.png';
import number1 from '../../image/Ranking/badge1.png';
import crown from '../../image/Ranking/crown.png';

const ProductReviewRankingTemp = () => {
  const [rankingList, setRankingList] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchRanking = async () => {

    await getReviewRankingApi.getReviewRanking().then(response => {
      setRankingList(response.data);
      setLoading(false);
    }).catch(e => {
      console.log('랭킹리스트 에러', e.response);
    });

  };

  useEffect(() => {
    fetchRanking();
  }, []);


  return (
    <div className='RankingTemp'>
            <Row className='titleArea'>
        <Col md='7'>
          <p className='title'>제품 랭킹</p>
        </Col>
      </Row>
      <hr className='hr' />
     
      {!loading && (
        <div className="ranking__page">
         <div className="top__3">
          
            <div className="top__item item__2">
            <div className="up__section">
              <div className="first__section">
                  <div className="ranking">2 nd </div>  <img className="img__crown"src={crown}/>
              </div>
              <Link  to={{
                  pathname: `searchProduct/food/${rankingList[1].foodId}`,
                  }}>
                    <img className="ranking__img item__1__img"  src={rankingList[1].foodImageAddress} />

              </Link>
            </div>
            <div className="down__section">
                    <CardTitle className={'title'}>{rankingList[1].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[1].category}  <AiOutlineStar/> {rankingList[1].avgRating}</CardText>
            </div>

          </div>

           <div className="top__item item__2">
            <div className="up__section">
              <div className="first__section">
                   <div className="ranking">1 st </div> <img className="img__crown"src={crown}/>
              </div>
              <Link  to={{
                  pathname: `searchProduct/food/${rankingList[0].foodId}`,
                  }}>
                    <img className="ranking__img item__1__img"  src={rankingList[0].foodImageAddress} />

              </Link>
            </div>
            <div className="down__section">
                  <CardTitle className={'title'}>{rankingList[0].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[0].category}  <AiOutlineStar/> {rankingList[0].avgRating}</CardText>
            </div>

          </div>

             <div className="top__item item__2">
            <div className="up__section">
              <div className="first__section">
                 <div className="ranking">3 rd </div> <img className="img__crown"src={crown}/>
              </div>
              <Link  to={{
                  pathname: `searchProduct/food/${rankingList[2].foodId}`,
                  }}>
                    <img className="ranking__img item__1__img"  src={rankingList[2].foodImageAddress} />

              </Link>
            </div>
            <div className="down__section">
                    <CardTitle className={'title'}>{rankingList[2].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[2].category}  <AiOutlineStar/> {rankingList[2].avgRating}</CardText>
            </div>

          </div>


         </div>

          <Table className={'RankingTable'}>
            <thead>
            <tr>
              <th width={'10%'}>순위</th>
              <th width={'35%'}>제품 명</th>
              <th width={'35%'}>카테고리</th>
              <th width={'15%'}>평균 점수</th>
            </tr>
            </thead>
            <tbody>
            {rankingList.map((item, index) => (
                <>
                  {index === 0 || index === 1 || index === 2 ?
                    null
                    :
                    <tr className={'RankingTableRow'} key={index}>

                      <th scope='row'>{index + 1}</th>
                      <td>
                        <Link to={{
                          pathname: `searchProduct/food/${item.foodId}`,
                        }}>{item.foodName}
                        </Link></td>
                      <td>{item.category}</td>
                      <td><AiFillStar className={'ratingStar'} />{item.avgRating}</td>
                    </tr>

                  }
                </>
              ),
            )}
            </tbody>
          </Table>
        </div>
      )}


    </div>
  );
};


export default ProductReviewRankingTemp;