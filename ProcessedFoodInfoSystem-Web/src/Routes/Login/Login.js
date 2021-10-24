import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Col,
  Container,
  Button,
  Card,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './LoginStyle.scss';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from 'api';
import {FiCheckCircle} from 'react-icons/fi';

var token;

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bChecked, setChecked] = useState(false);
  const [bSave, setSave] = useState(false);

  const login = (e) => {
    e.preventDefault();
    userLogin
      .userLoginApi(email, password)
      .then((response) => {
        token = response.headers.authorization;
        localStorage.setItem('authorization', token);
        window.location.href = '/';
      })
      .catch((error) => {
        alert('잘못된 정보입니다', error);
      });
    if (bSave) {
      localStorage.setItem('userLoginEmail', email);
      localStorage.setItem('userLoginPassword', password);
      localStorage.setItem('userBEmail', email);
      localStorage.setItem('userBPassword', password);
    } else if (!bSave) {
      localStorage.setItem('userLoginEmail', null);
      localStorage.setItem('userLoginPassword', null);
      localStorage.setItem('userBEmail', email);
      localStorage.setItem('userBPassword', password);
    }
  };

  const checkedItemHandler = (isChecked) => {
    if (isChecked) {
      setSave(true);
    } else if (!isChecked) {
      setSave(false);
    }
  };

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.checked);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log(localStorage.getItem('authorization'));
    if (localStorage.getItem('authorization') !== 'null') {
      alert('이미 로그인되어 있습니다.');
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="loginPage">
      <div className="katiLogin">
        <Container className="container">
          <p className="title">로그인</p>
          <Card body className="formBody">
            <Form>
              <FormGroup>
                <Label className="inputGroup">
                  <Input
                    type="email"
                    placeholder="이메일"
                    onChange={onEmailChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className="inputGroup">
                  <Input
                    type="password"
                    placeholder="비밀번호"
                    onChange={onPasswordChange}
                  />
                </Label>
              </FormGroup>
            <div className="under__section">
              <div className="login__btns">
               <div><button className="login__btn"  onClick={login} >로그인</button></div> 
                <div className="auto__login"> <input type="checkbox" onChange={(e) => checkHandler(e)}/><p className="auto__login__title"> 자동로그인</p></div> 
              </div>
              <div className="other__btns">
                 <Link to="/findUser/email" className="userGroup">이메일 찾기</Link>
                 <Link to="/findUser/password" className="userGroup">비밀번호 찾기</Link>
                 <Link to="/join" className="userGroup">회원가입</Link>
              </div>
            </div>
            </Form>
          </Card>
        </Container>
      </div>
      {/* <div className="socialLogin">
        <Container>
          <p className="title">소셜 로그인</p>

          <Card body>
            <button type="submit" class="btn btn-light btn-lg">
              <Link to="http://kkati.ml:8080/oauth2/authorization/google">
                <FcGoogle size="30" />
                구글로 로그인하기
              </Link>
            </button>
          </Card>
        </Container>
      </div> */}
    </div>
  );
}

export default Login;
