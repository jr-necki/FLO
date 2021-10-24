import { useState } from "react";
import { useEffect } from "react";
import { FaBuilding, FaCrown, FaAllergies } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import SearchResult from '../Search/SearchResult';
import './CategoryResult.scss';
const CategoryResult=({category,loading,result,totalResult})=>{
    
 const [categoryName,setCategoryName]=useState("");
 //const [result, setResult] = useState(null);
  //이전 검색 결과
  const [data, setData] = useState(null);
  //정렬방식 선택
  const [sort, setSort] = useState('ranking');
    //초기 설정 부분
  const [error, setError] = useState(null);
  

useEffect(async()=>{
  if(sessionStorage.getItem("sort")){
    setSort(sessionStorage.getItem("sort"));
  }

      setCategoryName(category.category);
      console.log("카테고리: ",categoryName);
      console.log(loading);
      console.log(result);
    
      
    },[]);
  const handleSort = async (sortType) => {
    setSort(sortType);
    sessionStorage.setItem("sort",sortType);
  };

    return(
        // <div className="result__show">
        //   <nav class="navbar navbar-light bg-light justify-content-between">
        //       <a class="navbar-brand">검색결과({totalResult})</a>
        //       <div className="form-check__group">
        //             <div class='form-check'>
        //               <input type='button' onClick={() => handleSort('ranking')} class='form-check-input' type='radio'
        //                     name='flexRadioDefault' id='flexRadioDefault2' />
        //               <label class='form-check-label' for='flexRadioDefault2'>
        //                 <FaCrown></FaCrown>랭킹순
        //               </label>
        //             </div>
        //             <div class='form-check'>
        //               <input type='button' onClick={() => handleSort('reviewCount')} class='form-check-input' type='radio'
        //                     name='flexRadioDefault' id='flexRadioDefault2' />
        //               <label class='form-check-label' for='flexRadioDefault2'>
        //                 <IoIosPaper></IoIosPaper>리뷰순
        //               </label>
        //             </div>

        //             <div class='form-check'>
        //               <input type='button' onClick={() => handleSort('manufacturer')} class='form-check-input' type='radio'
        //                     name='flexRadioDefault' id='flexRadioDefault2' />
        //               <label class='form-check-label' for='flexRadioDefault2'>
        //                 <FaBuilding></FaBuilding>제조사별
        //               </label>
        //             </div>
        //       </div>
        // </nav>
        // <SearchResult className='searchResult' loading={loading} result={result} sort={sort}/>
        // </div>
        <div>hi</div>
    );
}
export default CategoryResult;