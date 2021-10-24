import React, { useEffect, useState } from 'react';
import { deleteFavoriteApi, favouriteApi } from '../../api';
import { Link } from 'react-router-dom';
import './MyFavouriteStyle.scss';
import productSet from '../../image/kati.PNG';
import NoFavourite from '../ErrorPage/NoFavourite';
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

function MyFavourite() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkLoading, setCheckLoading] = useState(true);

  useEffect(() => {
    getFavourite();
  }, []);

  useEffect(() => {
    try {
      console.log(data);
      if (data.length >= 1) {
        console.log('ok');
        setLoading(false);
      } else if (data.length < 1) {
        console.log('no');
        setLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  const getFavourite = async () => {
    await favouriteApi
      .myFavourite()
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteF = async (foodId, e) => {
    await deleteFavoriteApi.deleteFavorite(foodId);
    getFavourite();
  };

  const setCheck = (data) => {
    if (data.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="myFavourite">
          <br />
          <br />
          <Row>
            <Col md="11">
              <p className="titleBar">MY 즐겨찾기 목록</p>
            </Col>
          </Row>
          <hr />
          {loading ? (
            <div>
              <br />
              <br />
              <br />
              <NoFavourite />
            </div>
          ) : (
            <div className="cardGroup">
              {data.map((food) => (
                <Card className="eachCard">
                  <CardBody className="cardTop">
                    <CardTitle tag="h5">{food.food.foodName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {food.food.category}
                    </CardSubtitle>
                  </CardBody>
                  <Link
                    to={{
                      pathname: `searchProduct/food/${food.food.foodId}`,
                    }}
                  >
                    <img
                      className="rankImage"
                      width="40%"
                      height="40%"
                      alt={food.food.foodName}
                      src={food.food.foodImageAddress}
                    />
                  </Link>
                  <CardBody className="showProps">
                    <Button
                      href={
                        `https://search.shopping.naver.com/search/all?query=` +
                        food.food.foodName
                      }
                      target="_blank"
                      color="dark"
                      className="badgeContent buttonF"
                      size="sm"
                    >
                      구매
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      className="buttonF"
                      onClick={(e) => deleteF(food.food.foodId, e)}
                    >
                      지우기
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
export default MyFavourite;
