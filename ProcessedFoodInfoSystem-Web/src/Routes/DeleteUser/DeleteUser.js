import React, { useState } from 'react';
import { Alert, Button, Card, CardTitle, Col, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { deleteReviewApi, userWithdrawal } from 'api';
import './DeleteUserStyle.scss';


function DeleteUser(props) {
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const withdrawal = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      await userWithdrawal.deleteUser(password).then(async () => {
          alert('회원 탈퇴 완료');
          localStorage.setItem('authorization', null);
          localStorage.setItem('userLoginEmail', null);
          localStorage.setItem('userLoginPassword', null);
          localStorage.setItem('userBEmail', null);
          localStorage.setItem('userBPassword', null);
          props.history.push('/');

        },
      ).catch(e => {
        alert('비밀번호가 틀렸습니다.');
      });
    } else {
    }
  };

  return (
    <div className='DeleteUser'>
      <Container>

        <p className='title'>탈퇴하기</p>


        <Card body>
          <Alert className={'deleteUSerAlert'} color='danger'>
            <p className='alertTitle'>탈퇴 시 유의사항</p>

            <p className='lead'>개인 정보 삭제 안내</p>
            <li className='lead'>작성하신 리뷰 정보는 탈퇴 후에도 삭제되지 않습니다.</li>
            <li className='lead'>탈퇴한 계정으로 kati 재가입은 불가합니다.</li>
          </Alert>
          <Col>
            <CardTitle className='card-title'>
              본인확인
            </CardTitle>
          </Col>
          <Col md='6'>
            <div class='form-group'>
              {/*<label className={'passwordLabel'} for="exampleDropdownFormPassword1">비밀번호</label>*/}
              <input
                type='password'
                class='form-control'
                id='exampleDropdownFormPassword1'
                placeholder='비밀번호 입력'
                onChange={onChange}
              />
            </div>
          </Col>
          <Col>
            <Button onClick={withdrawal} className='submitButton'>
              탈퇴하기
            </Button>
          </Col>
        </Card>
      </Container>
    </div>
  );
}

export default DeleteUser;
