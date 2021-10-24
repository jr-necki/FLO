import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import {
  Col,
  Container,
  Button,
  Card,
  CardText,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonToggle,
} from 'reactstrap';
import { setSecurityEmail } from 'api';
import { Link } from 'react-router-dom';

function SecondEmail() {
  const [secondEmail, setSecondEmail] = useState('');

  const onChange = (e) => {
    setSecondEmail(e.target.value);
  };

  const pushEmail = async () => {
    try {
      await setSecurityEmail.securityEmail(secondEmail);
      alert('2차 보안용 이메일이 ' + secondEmail + '로 설정되었습니다');
    } catch (e) {
      alert('실패');
    }
  };

  return (
    <div className="setEmail">
      <Container>
        <div className="secondEmailContainer">
          <Card body>
            <p className="title">2차 보안 설정</p>
            <hr className="secondEmail__line"/>
            <Form>
              <FormGroup>
                <Label className="secondEmail">
                  <Input
                    type="email"
                    placeholder="2차 보안용 이메일"
                    onChange={onChange}
                  />
                </Label>
              </FormGroup>
            </Form>
            <Row className={'buttonArea'}>
              <Link to="myPage">
                <Button outline color="danger" className={'cancelButton'}>
                  취소
                </Button>
              </Link>
              <Button
                outline
                color="warning"
                className={'submitButton'}
                onClick={pushEmail}
              >
                설정
              </Button>
            </Row>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default SecondEmail;
