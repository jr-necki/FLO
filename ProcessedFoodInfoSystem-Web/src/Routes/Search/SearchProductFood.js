import './SearchStyle.scss';
import { searchApi, getUserAllergyInfo } from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RiSearch2Line } from 'react-icons/ri';
import { AiOutlineFilter } from 'react-icons/ai';
import SearchResult from '../Search/SearchResult';
import {
  InputGroupAddon, Collapse,
} from 'reactstrap';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SearchProductFood = (props) => {
  //드롭다운
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [isOpen3, setIsOpen3] = useState(false);
  const toggle3 = () => setIsOpen3(!isOpen3);
  const [isOpen4, setIsOpen4] = useState(false);
  const toggle4 = () => setIsOpen4(!isOpen4);
  const [isOpen5, setIsOpen5] = useState(false);
  const toggle5 = () => setIsOpen5(!isOpen5);
  const [isOpen6, setIsOpen6] = useState(false);
  const toggle6 = () => setIsOpen6(!isOpen6);
  const [isOpen7, setIsOpen7] = useState(false);
  const toggle7 = () => setIsOpen7(!isOpen7);
  const [isOpen8, setIsOpen8] = useState(false);
  const toggle8 = () => setIsOpen8(!isOpen8);
  const [isOpen9, setIsOpen9] = useState(false);
  const toggle9 = () => setIsOpen9(!isOpen9);
  const [isOpen10, setIsOpen10] = useState(false);
  const toggle10 = () => setIsOpen10(!isOpen10);

  //정렬부분
  const [allergyCheck, setAllergyCheck] = useState(false);
  // const [isChecked2,setCheck2]=useState(false);
  // const [isChecked3,setCheck3]=useState(false);

  //알러지
  const [allergyLoading, setAllergyLoading] = useState(false);
  const [allergyList, setAllergyList] = useState(sessionStorage.getItem('allergyList') != null ? JSON.parse(sessionStorage.getItem('allergyList')) : []);

  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //옵션 선택, 세션 스토리지에 이전에 선택한 옵션 기록이 있으면 해당 옵션 받아옴(뒤로가기를 위해서)
  const [option, setOption] = useState(sessionStorage.getItem('selectedOption') === '제조사명' ? '제조사명' : '식품명');
  //파라미터
  const [searchTerm, setSearchTerm] = useState(null);
  //  세션 스토리지에 이전에 선택한 Sort 기록이 있으면 해당 옵션 받아옴(뒤로가기를 위해서)
  const [sort, setSort] = useState(sessionStorage.getItem('selectedSort') !== null ? sessionStorage.getItem('selectedSort') : 'ranking');
  const [order, setOrder] = useState('desc');

  // 검색 기록을 위한 state
  const [foodKeywords, setFoodKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForName') || '[]'),
  );
  const [bsshKeywords, setBsshKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForBssh') || '[]'),
  );
  const NUM_OF_SHOW_ROWS = 5; // 최대 저장 검색어
  //페이징 부분
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('selectedPage') > 1 ? sessionStorage.getItem('selectedPage') : 1);
  const [pageSize, setPageSize] = useState(0);


  useEffect(() => {
    console.log('setting 부분 마운트');

    setting();
  }, []);

  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem('keywordsFoodForName', JSON.stringify(foodKeywords));
    localStorage.setItem('keywordsFoodForBssh', JSON.stringify(bsshKeywords));
  }, [foodKeywords, bsshKeywords]);


  useEffect(() => {
    console.log('정보 가져오는 기준 변경 시 useEffect');
    getSearchResult(sessionStorage.getItem('searchTerm'));
  }, [currentPage, sort, allergyList]);

  useEffect(() => {
    handleAllergyCheck();
  }, []);

  const handleAllergyCheck = () => {
    // 첫 렌더링 시 알러지 체크 확인
    setAllergyCheck(sessionStorage.getItem('allergyCheck') === 'true');
    console.log(sessionStorage.getItem('allergyCheck'));
    console.log('allergyCheck: ', allergyCheck);
  };

  const setting = () => {

    if (props.location.state !== undefined) {
      console.log(props.location.state.searchTerm);
      setSearchTerm(props.location.state.searchTerm);
      setOption(props.location.state.option);
      console.log('전달된 값', searchTerm);
      getSearchResult(props.location.state.searchTerm);
      props.location.state = undefined;

    }
    // 이전 데이터 세션에서 불러왔을때 페이징 처리 어케해야할지.....
    // else {
    //   if (sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')) {


    // 뒤로가기 시 이전 검색 단어 데이터를 세션에서 불러옴
    // setSearchTerm(sessionStorage.getItem('searchTerm'));
    // console.log('이전 검색어: ', searchTerm);


    // setResult(JSON.parse(sessionStorage.getItem('data')));
    // console.log('이전 검색 결과', JSON.parse(sessionStorage.getItem('data')));
    // }
    // }
  };

  const getSearchResult = async (term) => {
    try {
      setLoading(true);
      if (option === '식품명') {
        console.log('알러지이이', allergyList);
        // api쪽에서 join써서 null이면 빈 배열로 줘야함
        const { data } = await searchApi.search(allergyList !== null ? allergyList : [], '', term, '', order, currentPage, 12, sort);
        setTotalResult(data.total_elements);
        setPageSize(data.total_page);

        console.log('결과', data.data);
        // 세션에서 검색결과 불러오는 건 아직 못하겠음 ㅜ
        // sessionStorage.setItem('data', JSON.stringify(data.data));
        // sessionStorage.setItem('pageSize', data.total_page);
        setResult(data.data);

      } else {
        const { data } = await searchApi.search(allergyList !== null ? allergyList : [], '', '', term, order, currentPage, 12, sort);
        setTotalResult(data.total_elements);
        setPageSize(data.total_page);

        console.log('결과', data.data);
        // 세션에서 검색결과 불러오는 건 아직 못하겠음 ㅜ
        // sessionStorage.setItem('data', JSON.stringify(data.data));
        setResult(data.data);
      }

    } catch (e) {
      setLoading(false);
      setError(e);
      console.log('결과 불러오기 에러', e);
    } finally {
      setLoading(false);
    }
  };

  //검색버튼 누를때
  const handleSubmit = () => {
    console.log('handlesubmit!!!!');
    // 새로운 검색단어 입력시 페이지 초기화
    sessionStorage.removeItem('selectedPage');
    // 새로운 검색단어 입력시 옵션 다시 저장
    sessionStorage.setItem('selectedOption', option);
    setCurrentPage(1);
    console.log('체크된 알러지', allergyList);
    if (searchTerm !== null && searchTerm.length !== 0) {
      // 새로운 검색단어 검색어 새로 저장
      sessionStorage.setItem('searchTerm', searchTerm);
      getSearchResult(searchTerm);
      handleAddKeyword();

    } else {
      setError('검색결과가 없습니다!');
    }
  };
  const handleSort = async (sortType) => {
    setSort(sortType);
    // 새로운 소트 변경시
    setCurrentPage(1);  // 페이지 초기화
    sessionStorage.removeItem('selectedPage'); // 페이지 초기화
    sessionStorage.setItem('selectedSort', sortType); // 소트 새로 서장
    console.log(sortType);
  };

  // 검색어 입력시 keywords에 추가
  const handleAddKeyword = () => {
    if (option === '식품명') {
      for (let i = 0; i < Math.min(foodKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (foodKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (foodKeywords.length > 100) {
        // 최대 100건만 저장
        foodKeywords.length = 100;
      }
      setFoodKeywords([newKeyword, ...foodKeywords]);
    } else {
      for (let i = 0; i < Math.min(bsshKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (bsshKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (bsshKeywords.length > 100) {
        // 최대 100건만 저장
        bsshKeywords.length = 100;
      }
      setBsshKeywords([newKeyword, ...bsshKeywords]);
    }

  };
  const handleAllergy = async () => {
    if (allergyCheck) {//이미 체크 상태
      setAllergyCheck(false);
      console.log('체크1');
      setAllergyList(null);
      // 알러지 체크 해제시 세션값 변경
      sessionStorage.setItem('allergyCheck', false);
      sessionStorage.setItem('allergyList', null);
      setCurrentPage(1);  // 페이지 초기화
      sessionStorage.removeItem('selectedPage'); // 페이지 초기화
    } else {//체크 안된 상태엿다면
      setAllergyLoading(true);

      await getUserAllergyInfo
        .userAllergies()
        .then((response) => {
          console.log('알러지', result);
          alert(response.data.userAllergyMaterials);
          setAllergyList(response.data.userAllergyMaterials);

          setAllergyCheck(true);
          // 알러지 체크 해제시 세션값 변경 sessionStorage에서 배열 쓰려면 JSON.stringify로 써야하는듯
          sessionStorage.setItem('allergyCheck', true);
          sessionStorage.setItem('allergyList', JSON.stringify(response.data.userAllergyMaterials));
          setCurrentPage(1);  // 페이지 초기화
          sessionStorage.removeItem('selectedPage'); // 페이지 초기화
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data['error-message']);
        });

    }

  };

  const handleCategory = async (e) => {
    // 카테고리 선택시 기존에 검새관련 옵션 초기화
    sessionStorage.removeItem('selectedPage');
    setCurrentPage(1);
    sessionStorage.removeItem('selectedSort');
    sessionStorage.setItem('selectedOption', option); // 옵션은 유지할지 말지

    console.log('소분류 클릭');
    // 클릭한 카테고리 이름 세션에 추가
    sessionStorage.setItem('categoryName', e);
    // getSmallCategory(currentPage, 'init');
  };

  const onClickPage = async (pageNum) => {
    setCurrentPage(pageNum.selected + 1);
    sessionStorage.setItem('selectedPage', pageNum.selected + 1);

    console.log('페이징 클릭 ', pageNum);

  };


  return (
    <div className='category__container'>
      <div className='category__list'>
        <div className='item__category list-group category__list'>
          <button className='bigCategoryBtn list-group-item' color='primary' onClick={toggle1}>간식
            <div style={{ float: 'right' }}>
              {!isOpen1 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen1}>
            <Link to='/category/snack'>
              <button
                type='button'
                value='과자'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('과자')}
              >
                과자
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='떡'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('떡')}
              >
                떡
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='빵'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('빵')}
              >
                빵
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='사탕/껌/젤리'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('사탕/껌/젤리')}
              >
                사탕/껌/젤리
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='아이스크림'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('아이스크림')}
              >
                아이스크림
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='초콜릿'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('초콜릿')}
              >
                초콜릿
              </button>
            </Link>

          </Collapse>

          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle2}>음료/차
            <div style={{ float: 'right' }}>
              {!isOpen2 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>

          </button>
          <Collapse isOpen={isOpen2}>
            <Link to='/category/tea'>
              <button
                type='button'
                value='음료'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('음료/차')}
              >
                음료
              </button>
            </Link>
            <Link to='/category/tea'>
              <button
                type='button'
                value='커피'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('커피')}
              >
                커피
              </button>
            </Link>
            <Link to='/category/tea'>
              <button
                type='button'
                value='커피/차'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('커피/차')}
              >
                커피/차
              </button>
            </Link>
          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle3}>유제품
            <div style={{ float: 'right' }}>
              {!isOpen3 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen3}>

            <Link to='/category/milk'>
              <button
                type='button'
                value='유제품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('유제품')}
              >
                유제품
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle9}>육류
            <div style={{ float: 'right' }}>
              {!isOpen9 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen9}>

            <Link to='/category/meat'>
              <button
                type='button'
                value='육류'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('육류')}
              >
                육류
              </button>
            </Link>
            <Link to='/category/meat'>
              <button
                type='button'
                value='햄/소시지'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('햄/소시지')}
              >
                햄/소시지
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle10}>식재료
            <div style={{ float: 'right' }}>
              {!isOpen10 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen10}>

            <Link to='/category/material'>
              <button
                type='button'
                value='국수'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('국수')}
              >
                국수
              </button>
            </Link>
            <Link to='/category/material'>
              <button
                type='button'
                value='두부'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('두부')}
              >
                두부
              </button>
            </Link>

            <Link to='/category/material'>
              <button
                type='button'
                value='식용유'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('식용유')}
              >
                식용유
              </button>
            </Link>

            <Link to='/category/material'>
              <button
                type='button'
                value='어묵'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('어묵')}
              >
                어묵
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle4}>농수산물
            <div style={{ float: 'right' }}>
              {!isOpen4 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen4}>

            <Link to='/category/food'>
              <button
                type='button'
                value='계란'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('계란')}
              >
                계란
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='과일/채소'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('과일/채소')}
              >
                과일/채소
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='김'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('김')}
              >
                김
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='수산물'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('수산물')}
              >
                수산물
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='견과'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('견과')}
              >
                견과
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='곡류'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('견과')}
              >
                곡류
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle5}>김치
            <div style={{ float: 'right' }}>
              {!isOpen5 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen5}>

            <Link to='/category/kimchi'>
              <button
                type='button'
                value='김치'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('김치')}
              >
                김치
              </button>
            </Link>
            <Link to='/category/kimchi'>
              <button
                type='button'
                value='젓갈'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('젓갈')}
              >
                젓갈
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle6}>조미료
            <div style={{ float: 'right' }}>
              {!isOpen6 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen6}>

            <Link to='/category/con'>
              <button
                type='button'
                value='설탕'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('설탕')}
              >
                설탕
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='소금'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('소금')}
              >
                소금
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='소스'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('소스')}
              >
                소스
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='장류'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('장류')}
              >
                장류
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle7}>즉석조리식품
            <div style={{ float: 'right' }}>
              {!isOpen7 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen7}>

            <Link to='/category/mealKit'>
              <button
                type='button'
                value='즉석조리식품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('즉석조리식품')}
              >
                즉석조리식품
              </button>
            </Link>
          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle8}>기타
            <div style={{ float: 'right' }}>
              {!isOpen8 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen8}>

            <Link to='/category/etc'>
              <button
                type='button'
                value='기타가공품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('기타가공품')}
              >
                기타가공품
              </button>
            </Link>

          </Collapse>
        </div>
      </div>
      <div className='category__show'>
        <div className='category__line'>
          <nav class='navbar  justify-content-between'>
            <p className='category__title'>
              <Link to='/searchProduct/food'>
                <button className='category__btn' onClick={() => {
                  sessionStorage.removeItem('selectedPage');
                  sessionStorage.removeItem('searchTerm');
                  sessionStorage.removeItem('selectedOption');

                }}>상품찾기
                </button>
              </Link>
            </p>
            <header className='item__header'>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  {option}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => {
                    setOption('식품명');
                  }}>식품명</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
                    setOption('제조사명');
                  }}>제조사명</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {searchTerm === null ? <input
                  placeholder='검색어를 입력하세요'
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  type='search'
                  className='input'
                /> :
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  type='search'
                  className='input'
                />
              }
              <InputGroupAddon addonType='append'>
                <Link to={{
                  pathname: '/searchProduct/food',
                }}>
                  <button onClick={handleSubmit} className='searchBtn'>
                    <RiSearch2Line size='40'></RiSearch2Line>
                  </button>
                </Link>
              </InputGroupAddon>

            </header>

          </nav>
          <hr className='hr__search'></hr>
        </div>

        <div>
          <nav class='navbar navbar-light bg-light justify-content-between'>
            <div className='result_allergy'>

              <div className='navbar-brand nav__result'>검색결과 ({totalResult})</div>

            </div>
            <div className='form-check__group'>

              {allergyCheck === true ?
                <AiOutlineFilter type='button' onClick={handleAllergy} data-toggle='tooltip' data-placement='bottom'
                                 title='알레르기 필터 기능입니다.' size='40'
                                 style={{ color: 'red' }} /> :
                <AiOutlineFilter type='button' onClick={handleAllergy} data-toggle='tooltip' data-placement='bottom'
                                 title='알레르기 필터 기능입니다.' size='40' style={{ color: 'black' }} />
              }

              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('ranking')}
                       className={sort === 'ranking' ? 'form-check-input checked' : 'form-check-input'}
                       name='flexRadioDefault' id='flexRadioDefault2' value='category'
                       checked={sort === 'ranking' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  랭킹순
                </label>
              </div>
              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('manufacturer')} className='form-check-input'
                       name='flexRadioDefault' id='flexRadioDefault2' checked={sort === 'manufacturer' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  제조사
                </label>
              </div>

              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('reviewCount')} className='form-check-input'
                       name='flexRadioDefault' id='flexRadioDefault2' checked={sort === 'reviewCount' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  리뷰순
                </label>
              </div>
            </div>
          </nav>
        </div>
        <SearchResult className='searchResult' loading={loading} result={result} sort={sort} pageSize={pageSize}
                      onClickPage={(pageNum) => onClickPage(pageNum)} selectedPage={currentPage} />
      </div>
    </div>
  );
};
export default SearchProductFood;