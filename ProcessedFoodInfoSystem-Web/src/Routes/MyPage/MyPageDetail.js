import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, Col, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserReviews from './UserReviews';
import { getUserAllergyInfo, getUserInfoApi, getUserSummary } from '../../api';
import './MyPageStyle.scss';


const MyPageDetail = () => {
  const [data, setData] = useState([]);
  const [writtenData, setWrittenData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [allergyLoading, setAllergyLoading] = useState(true);
  const [favouriteCount, setFavouriteCount] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [userName, setUserName] = useState('');
  const [toggleReview, setToggleReview] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: null,
    address: null,
    birth: null,
  });
  const { name, address, birth } = userInfo;

  const getUSerInfo = async () => {
    await getUserInfoApi.gerUserInfo().then(res => {
      console.log(res.data);
      setUserInfo(
        {
          name: res.data.name,
          address: res.data.address,
          birth: res.data.birth,
        },
      );
    }).catch(e => {
      console.log('유저 정보 에러', e.response);
    });
  };

  useEffect(() => {
    const gogogetAllergy = async () => {
      setAllergyLoading(true);
      await getUserAllergyInfo
        .userAllergies()
        .then((response) => {
          const result = response.data.userAllergyMaterials;
          setData(result);
          setAllergyLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const gogogetSummary = async () => {
      setUserLoading(true);
      await getUserSummary
        .userSummary()
        .then((response) => {
          setUserLoading(false);
          setFavouriteCount(response.data.favorite_count);
          setReviewCount(response.data.review_count);
          setUserName(response.data.user_name);
          const { userSummary } = [favouriteCount, reviewCount, userName];
          setWrittenData({ userSummary });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    gogogetAllergy();
    gogogetSummary();
    getUSerInfo();
  }, []);

  const onclickReview = () => {
    setToggleReview(prevState => (!prevState));
  };

  return (
    <div className='myPageDetail'>
      <Container>
        <Col md='12'>
          <p className='shownPage'>상세보기</p>
        </Col>
        <div className={'userInfoArea'}>
          <Table>
            <tr>
              <th width={'20%'}>이름</th>
              <td width={'80%'}>{name}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th>생일</th>
              <td>{birth}</td>
            </tr>
            <tr>
              <th width={'20%'}>즐겨찾기 개수</th>
              <td width={'80%'}>
                <Link to='/myFavourite'>
                  {favouriteCount}
                </Link></td>
            </tr>
            <tr>
              <th width={'20%'}>리뷰 개수</th>
              <td width={'80%'} style={{ cursor: 'pointer' }} onClick={onclickReview}>{reviewCount} (자세히 보기)</td>
            </tr>
          </Table>
          {toggleReview && <UserReviews />}
          <hr className='line__divider' />

        </div>
        <br />
        <br />
        <div className={'userAllergyArea'}>
          <p className={'title'}>알러지 정보</p>
          {data === [] ? (
            <Col md='12'>설정된 알러지가 없습니다. </Col>
          ) : (
            <div>
              {data.map((item, index) => (
                <Card body key={index} className={'allergyItem'}>
                  <CardText>{item}</CardText>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>

    </div>
  );
};


export default MyPageDetail;