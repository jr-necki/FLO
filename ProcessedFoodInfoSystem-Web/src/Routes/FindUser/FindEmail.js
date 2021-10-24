import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Container,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import '../FindUser/FindEmailStyle.scss';
import isEmail from 'validator/es/lib/isEmail';
import { findEmail } from 'api';
import Loading from '../ErrorPage/Loading';

const FindEmail = () => {
  const [secondEmail, setSecondEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const onChange = (e) => {
    setSecondEmail(e.target.value);
    console.log(secondEmail);
  };

  const emailSubmit = () => {
    setLoading(true);

    if (!isEmail(secondEmail)) {
      setMessage('잘못된 이메일 형식 입니다.');
      setLoading(false);
    } else {
      setMessage(null);
      findEmail
        .findUserEmail(secondEmail)
        .then((response) => {
          alert(
            ' 입력하신 ' + secondEmail + '로 이메일을 발송했습니다',
            response,
          );
          window.location.href = '/login';
          setLoading(false);
        })
        .catch((error) => {
          alert('잘못된 이메일 주소입니다', error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="findEmail">
      <Container className="container">
        {loading && <Loading className="loading__now" />}
        <div style={loading ? { opacity: '0.7' } : null}>
          <p className="title">이메일 찾기</p>
          <Card body>
            <FormGroup>
              <Label className="secondEmailInput">
                <Input
                  type="email"
                  placeholder="2차 보안 이메일"
                  onChange={onChange}
                />
              </Label>
              <Label className="buttonArea">
                <Button
                  className={'submitButton'}
                  onClick={!loading ? emailSubmit : (e) => e.preventDefault()}
                  style={loading ? { cursor: 'not-allowed' } : null}
                >
                  찾기
                </Button>
              </Label>
              <Label className={'alertArea'}>
                {message != null ? (
                  <Alert color="danger">{message}</Alert>
                ) : null}
              </Label>
            </FormGroup>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default FindEmail;
