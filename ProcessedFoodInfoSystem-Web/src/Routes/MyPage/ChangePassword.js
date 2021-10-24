import React, { useEffect, useState } from 'react';
import './ChangePasswordStyle.scss';
import { Container, Card, Alert } from 'reactstrap';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { userChangePW, userJoin } from 'api';

var token;

function ChangePassword(props) {
  const [beforePassword, setBeforePassword] = useState('');
  const [afterPassword, setAfterPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [error, setError] = useState({
    conPasswordError: null,
  });

  token = localStorage.getItem('authorization');

  const history = useHistory();

  const passwordSubmit = async () => {
    if (conPassword === '' || error.conPasswordError !== null) {
      alert('확인 비밀번호가 일치하지 않습니다.');
    } else {
      await userChangePW.changePW(beforePassword, afterPassword).then(() => {
        props.history.goBack();
        if (localStorage.getItem('userLoginPassword') !== 'null') {
          localStorage.setItem('userLoginPassword', afterPassword);
        }
        localStorage.setItem('userBPassword', afterPassword);
        alert('변경 완료');
      }).catch(e => {
        console.log(e.response);
        alert('입력하신 비밀번호가 동일 혹은 다릅니다');
      });
    }
  };


  const onBeforePassword = (e) => {
    setBeforePassword(e.target.value);
  };

  const onAfterPassword = (e) => {
    setAfterPassword(e.target.value);
  };

  const onConAfterPassword = (e) => {
    setConPassword(e.target.value);
  };

  useEffect(() => {
    if (conPassword !== afterPassword) {
      setError({ ...error, conPasswordError: '비밀번호가 일치하지 않습니다.' });
    } else {
      setError({ ...error, conPasswordError: null });
    }
  }, [afterPassword, conPassword]);

  return (
    <div className='changePasswordPage'>
      <br />
      <br />
      <br />
      <Container>
        <Card body>
          <form>
            <p className={'title'}>비밀번호 변경하기</p>
            <hr className="line__divider" />
            <div class='form-group'>
              <input
                type='password'
                class='form-control'
                id='exampleDropdownFormEmail1'
                placeholder='현재 비밀번호'
                onChange={onBeforePassword}
              />
            </div>
            <div class='form-group'>
              <input
                type='password'
                class='form-control'
                id='exampleDropdownFormPassword1'
                placeholder='희망 비밀번호'
                onChange={onAfterPassword}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='exampleDropdownFormPassword1'
                placeholder='희망 비밀번호 확인'
                onChange={onConAfterPassword}
              />
            </div>
            {error.conPasswordError !== null && <Alert color={'danger'}>{error.conPasswordError} </Alert>}
          </form>
          <div className={'buttonArea'}>
            <Link to='myPage'>
              <button
                className='btn cancelButton'
              >
                취소
              </button>
            </Link>
            <button
              onClick={passwordSubmit}
              type='submit'
              className='btn submitButton'
            >
              변경
            </button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ChangePassword;
