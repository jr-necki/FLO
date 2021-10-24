import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './MyAllergies.scss';
import axios from 'axios';
import { setUserAllergyInfo } from 'api';
import { Link } from 'react-router-dom';
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
import { getUserAllergyInfo } from '../../api';

function MyAllergies() {
  const [allergyList, setAllergyList] = useState([]);
  const [data, setData] = useState([]);
  const [allergyLoading, setAllergyLoading] = useState(true);
  const [shownAllergy1, setShownAllergy1] = useState([
    '아몬드',
    '우유',
    '대두',
    '밀',
    '닭고기',
    '쇠고기',
  ]);
  const [shownAllergy2, setShownAllergy2] = useState([
    '새우',
    '오징어',
    '잣',
    '소고기',
    '돼지고기',
    '메추리알',
  ]);
  const [shownAllergy3, setShownAllergy3] = useState([
    '토마토',
    '조개류',
    '난류',
    '호두',
    '복숭아',
    '땅콩',
  ]);
  const [shownAllergy4, setShownAllergy4] = useState([
    '게',
    '아황산류',
    '메밀',
    '계란',
  ]);

  useEffect(() => {
    try {
      gogogetAllergy();
      console.log(allergyList, 'useEffect 기존 Data 알러지리스트');
    } catch (e) {
      console.log(e);
    }
  }, [!allergyLoading]);

  const gogogetAllergy = async () => {
    await getUserAllergyInfo
      .userAllergies()
      .then((response) => {
        const result = response.data.userAllergyMaterials;
        setData(result);
        setAllergyLoading(false);
        console.log(data, '기존 알러지');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      setAllergyList(data);
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.checked == true) {
      console.log('온체인지 true', e.target.checked);
      setAllergyList([...allergyList, e.target.name]);
      // setAllergy(e.target.name);
    } else if (e.target.checked == false) {
      console.log('온체인지 false', e.target.checked);
      onRemove(e.target.name);
    }
  };

  const onRemove = (name) => {
    setAllergyList(allergyList.filter((allergy) => allergy !== name));
    console.log('onRemove 작동', allergyList);
  };

  const createAllergy = async () => {
    try {
      await setUserAllergyInfo.setAllergies(allergyList);
      alert('저장되었습니다.');
      window.location.replace('/mypage');
    } catch (e) {
      alert(e.response.data['error-message']);
    }
  };

  return (
    <div className="myAllergies">
      <br />
      <br />
      <Container>
        <div className="changeAllergyInfo">
          <Row>
            <p>알러지 정보 변경하기</p>
          </Row>
          <hr />
        </div>

        {!allergyLoading && (
          <div>
            <Form className="checkboxGroup">
              <Row>
                {shownAllergy1.map((item, index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          key={index}
                          type="checkbox"
                          name={item}
                          onChange={onChange}
                          checked={allergyList.includes(item)}
                        />
                        {item}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy2.map((item, index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          key={index}
                          type="checkbox"
                          name={item}
                          onChange={onChange}
                          checked={allergyList.includes(item)}
                        />
                        {item}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy3.map((item, index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          key={index}
                          type="checkbox"
                          name={item}
                          onChange={onChange}
                          checked={allergyList.includes(item)}
                        />
                        {item}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy4.map((item, index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          key={index}
                          type="checkbox"
                          name={item}
                          onChange={onChange}
                          checked={allergyList.includes(item)}
                        />
                        {item}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
            </Form>
            <div className="buttonGroup">
              <Row className={'buttonArea'}>
                <Link to="/myPage">
                  <Button className={'cancelButton'}>취소</Button>
                </Link>
                <Button className={'submitButton'} onClick={createAllergy}>
                  저장하기
                </Button>
              </Row>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyAllergies;

// "allergyList": [
// "string"
//   ],
