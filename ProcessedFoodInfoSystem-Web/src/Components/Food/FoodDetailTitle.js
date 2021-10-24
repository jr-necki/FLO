import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/all';

const FoodDetailTitle = ({food,isLogin,isFavorite,onClickFavoriteButton  }) => {
  return (
    <div>
      <Row className='titleArea'>
        {/*<Col lg='2'>*/}
        {/*  <p className='title'> {food.category.split('_')[0]}</p>*/}
        {/*</Col>*/}
        <Col lg='12'>


        </Col>
      </Row>
    </div>
  );
};

export default React.memo(FoodDetailTitle);