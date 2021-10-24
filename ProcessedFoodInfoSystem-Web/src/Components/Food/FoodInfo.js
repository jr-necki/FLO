import React from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/all';

const FoodInfo = ({ food, onMoveToLink, onMoveToNews, isLogin, isFavorite, onClickFavoriteButton }) => {
  return (
    <div className='foodInfoArea'>
      <Col lg='12'>
        <p className='category'>  {food.category.split('_')[0]}</p>
        <div className={'hr'} />
        <p className='foodName'>{food.foodName}</p>
        {/*<p className='manufacturerName'>제조사: {food.manufacturerName.split('_')[0]}</p>*/}
        {/*<p className='allergyMaterials'>알러지 성분:  {food.allergyMaterials.split('_')[0]}</p>*/}

        <Table className={'foodInfoTable'}>
          <tr>
            <th width={'35%'}>
              제조사
            </th>
            <td width={'65%'}>
              {food.manufacturerName.split('_')[0]}
            </td>
          </tr>
          <tr>
            <th >
              알레르기 성분
            </th>
            <td>
              {food.allergyMaterials.split('_')[0]}
            </td>
          </tr>
        </Table>
      </Col>

      <div className={'btnArea'}>
        {/*<div className={'hr'}/>*/}

        <Row>
          <Col sm='12'>
            {isLogin ? <Button className='favoriteButton' onClick={onClickFavoriteButton}>
              {!isFavorite ? <AiOutlineStar size={'1.3em'} /> : <AiFillStar size={'1.3em'} />}
            </Button> : null}
          </Col>
          <Col sm={'12'}>
            {food.manufacturerName.split('_')[0] !== '알수없음' ?
              <Button className='newsButton' onClick={onMoveToNews}>
                제조사 뉴스
              </Button> : null}
          </Col>
          <Col lg='12'>
            <Button className='linkButton' onClick={onMoveToLink}>
              상품 구매하러 가기
            </Button>
          </Col>
        </Row>


      </div>


      {/*<FoodImageCarousel image={food.foodImageAddress} metaImage={food.foodMeteImageAddress} />*/}
      {/*<Table className={'foodInfoTable'}>*/}
      {/*<tr>*/}
      {/*  <th>*/}
      {/*    상품명*/}
      {/*  </th>*/}
      {/*  <td>*/}
      {/*    {food.foodName}*/}
      {/*  </td>*/}
      {/*</tr>*/}
      {/*<tr>*/}
      {/*  <th>*/}
      {/*    제조사*/}
      {/*  </th>*/}
      {/*  <td>*/}
      {/*    {food.manufacturerName.split('_')[0]}*/}
      {/*  </td>*/}
      {/*</tr>*/}
      {/*  <tr>*/}
      {/*    <th>*/}
      {/*      카테고리*/}
      {/*    </th>*/}
      {/*    <td>*/}
      {/*      {food.category.split('_')[0]}*/}
      {/*    </td>*/}
      {/*  </tr>*/}
      {/*  <tr>*/}
      {/*    <th>*/}
      {/*      알레르기 성분*/}
      {/*    </th>*/}
      {/*    <td>*/}
      {/*      {food.allergyMaterials.split('_')[0]}*/}
      {/*    </td>*/}
      {/*  </tr>*/}
      {/*</Table>*/}
      {/*상품 정보 좌측 하단 영역 시작 */}
      {/*<hr className='hr' />*/}
      {/*<Row className='foodInfo'>*/}
      {/*  <Col sm='6'>*/}
      {/*    <p className='subTitle'>성분</p>*/}
      {/*    <span className={'foodInfoDesc'}>*/}
      {/*       {food.nutrient}*/}
      {/*    </span>*/}

      {/*  </Col>*/}
      {/*  <Col sm='6'>*/}
      {/*    <p className='subTitle'>원료</p>*/}
      {/*    <span className={'foodInfoDesc'}>*/}
      {/*       {food.materials}*/}
      {/*    </span>*/}

      {/*  </Col>*/}
      {/*</Row>*/}
      {/*상품 정보 좌측 하단 영역 끝 */}
    </div>
  );
};

export default React.memo(FoodInfo);