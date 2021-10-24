import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { changeUserInfoApi, getUserInfoApi } from 'api';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import moment from 'moment/moment';
import './ChangeUserInfoStyle.scss';
import 'react-datepicker/dist/react-datepicker.css';

const ChangeUserInfo = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: null,
    address: null,
    birth: null,
  });

  useEffect(() => {
    getUSerInfo();
  }, []);

  const { name, address, birth } = userInfo;

  registerLocale('ko', ko);

  useEffect(() => {
    if (birth === "Invalid date") {
      setUserInfo({ ...setUserInfo, birth: moment(new Date()).format('yyyy-MM-DD') });
    }
  }, [birth]);

  const getUSerInfo = async () => {
    await getUserInfoApi
      .gerUserInfo()
      .then((res) => {
        console.log(res.data);
        setUserInfo({
          name: res.data.name,
          address: res.data.address,
          birth: res.data.birth,
        });
      })
      .catch((e) => {
        console.log('유저 정보 에러', e.response);
      });
  };

  const setUserName = (e) => {
    if (e.target.value === null || e.target.value === 'null') {
    } else {
      setUserInfo({ ...userInfo, name: e.target.value });
    }
  };

  const setUserAddress = (e) => {
    if (e.target.value === null || e.target.value === 'null') {
    } else {
      setUserInfo({ ...userInfo, address: e.target.value });
    }
  };

  const setUserBirth = (date) => {
    setUserInfo({ ...userInfo, birth: moment(date).format('yyyy-MM-DD') });
  };

  const changeInfo = async () => {
    await changeUserInfoApi
      .changeUserInfo(address, birth, name)
      .then((res) => {
        alert(
          name +
          '님' +
          '  생일: ' +
          birth +
          '  주소:  ' +
          address +
          '로 변경되었습니다',
        );
        props.history.goBack();
      })
      .catch((e) => {
        console.log('정보 수정 에러', e.response);
        alert('실패하였습니다');
      });
  };

  return (
    <div className={'changeUserInfo'}>
      <br />
      <br />
      <br />
      <Container>
        <Card body>
          <Row>
            <Col md='12'>
              <p className='shownChange'>내 정보 변경하기</p>
            </Col>
          </Row>
          <hr />

          <Form className={'changeInfoForm'}>
            <FormGroup>
              <Input
                type='text'
                name='name'
                value={name}
                onChange={setUserName}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='name'
                value={address}
                onChange={setUserAddress}
              />
            </FormGroup>
            <FormGroup>
              <Row className={'pickerRow'}>
                <DatePicker
                  id='inputBirth'
                  wrapperClassName='birthDayPicker'
                  dateFormat='yyyy-MM-dd'
                  selected={new Date(birth)}
                  maxDate={new Date()}
                  onChange={(date) => setUserBirth(date)}
                  popperPlacement='bottom-start'
                  locale='ko'
                  showYearDropdown={'true'}
                  showMonthDropdown={'true'}
                  dropdownMode={'select'}
                />
              </Row>
            </FormGroup>
          </Form>

          <Row className={'buttonArea'}>
            <Link to='myPage'>
              <Button outline color='danger' className={'cancelButton'}>
                취소
              </Button>
            </Link>
            <Button
              outline
              color='warning'
              className={'submitButton'}
              onClick={changeInfo}
            >
              변경
            </Button>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default ChangeUserInfo;
