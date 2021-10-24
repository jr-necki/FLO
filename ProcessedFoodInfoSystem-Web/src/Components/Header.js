import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './HeaderStyle.scss';
import axios from 'axios';

import {
  AiOutlineUserAdd,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineStar,
} from 'react-icons/ai';
import { RiUser3Line } from 'react-icons/ri';

function LoginState(props) {
  const checkLogin = props.auli;
  console.log(checkLogin);
  console.log('main main ');

  var uN, uA, uB, userA, token;

  const setUserInformation = () => {
    console.log('유저 정보 가져오기 메소드');
    axios
      .get('http://13.124.55.59:8080/api/v1/user/user-info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: checkLogin,
        },
      })
      .then((response) => {
        console.log('데이터 받아서 넣는거 시작 ㅇ-ㅇ');

        uN = response.data.name;
        localStorage.setItem('name', uN);
        console.log('이름 세팅 ㅇㅋ');

        uA = response.data.address;
        localStorage.setItem('address', uA);
        console.log('주소도 ㅇㅋㅇㅋ');

        uB = response.data.birth;
        localStorage.setItem('birth', uB);
        console.log('생일까지 ㅇㅋㅇㅋ');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (checkLogin !== 'null') {
    return (
      <div className="buttons">
        <Link
          to="/mypage"
          className="myPageBtn, buttonGroup"
          onClick={setUserInformation}
        >
          <RiUser3Line size="25" />
        </Link>
        <Link to="/myFavourite" className="myFavouriteBtn, buttonGroup">
          <AiOutlineStar size="25" />
        </Link>

        <Link
          className="logoutBtn, buttonGroup"
          onClick={() => {
            localStorage.setItem('authorization', null);
            localStorage.setItem('userLoginEmail', null);
            localStorage.setItem('userLoginPassword', null);
            localStorage.setItem('userBEmail', null);
            localStorage.setItem('userBPassword', null);
            window.location.href = '/';
          }}
        >
          <AiOutlineLogout size="25" />
        </Link>
      </div>
    );
  } else if (checkLogin === 'null') {
    return (
      <div className="buttons">
        <Link to="/login" className="loginBtn, buttonGroup">
          <AiOutlineLogin size="25" />
        </Link>
        <Link to="/join" className="joinBtn, buttonGroup">
          <AiOutlineUserAdd size="25" />
        </Link>
      </div>
    );
  }
}

const Item = styled.div`
  height: 50px;
  text-align: center;
  text-decoration: none;
  font-size: medium;
  margin: 0px 10px;
  padding: 0px 20px;
  border-bottom: 4px solid
    ${(props) => (props.current ? '#ffff' : 'transparent')};
  transition: border-bottom 0.3s ease-in-out;
`;

//컴포넌트에서 라우터에 접근 현재 어떤 컴포넌트인지 라우터도 알수 있음!
export default withRouter(({ location: { pathname } }) => (
  <header className="header">
    <div className="headerWidth">
      <div className="serviceName">
        <Link
          className="serviceName"
          to="/"
          onClick={() => {
            // 새로운 메뉴 진입시 검색 관련 세션 초기화
            sessionStorage.removeItem('categoryName');
            sessionStorage.removeItem('selectedPage');
            sessionStorage.removeItem('selectedSort');
            sessionStorage.removeItem('selectedOption');
            sessionStorage.removeItem('allergyList');
            sessionStorage.removeItem('allergyCheck');
            sessionStorage.removeItem('searchTerm');
          }}
        >
          KATI
        </Link>
      </div>
    </div>
    <div className="menu_login">
      <ul className="menuItems">
        <Item className="item" current={pathname === '/searchProduct/food'}>
          <Link
            className="item__name"
            to="/searchProduct/food"
            onClick={() => {
              // 새로운 메뉴 진입시 검색 관련 세션 초기화
              sessionStorage.removeItem('categoryName');
              sessionStorage.removeItem('selectedPage');
              sessionStorage.removeItem('selectedSort');
              sessionStorage.removeItem('selectedOption');
              sessionStorage.removeItem('allergyList');
              sessionStorage.removeItem('allergyCheck');
              sessionStorage.removeItem('searchTerm');
            }}
          >
            상품찾기
          </Link>
        </Item>
        <Item className="item" current={pathname === '/productRanking'}>
          <Link className="item__name" to="/productRanking">
            제품랭킹
          </Link>
        </Item>
        <Item className="item" current={pathname === '/about'}>
          <Link className="item__name" to="/about">
            카티 개발팀
          </Link>
        </Item>
      </ul>
      <div className="userItem">
        <LoginState
          className="item__log"
          auli={localStorage.getItem('authorization')}
        />
      </div>
    </div>
  </header>
));
