import {AiOutlineStar,AiFillStar} from "react-icons/ai";
import "./NoFavourite.scss";
import { Link } from 'react-router-dom';
import {
  Button,
} from 'reactstrap';
const  NoFavourite=()=>{
    return (
        <div className="page">
            <AiOutlineStar className="icon" size="100"></AiOutlineStar>
            <div className="content">
                <h1 className="title"> 즐겨찾기가 없습니다 </h1>
                <div className="check">
                <div className="checklist">
                <div className="tryFB"><AiFillStar size="20"></AiFillStar> 
                관심있는 음식에 별 버튼을 클릭해보세요</div>
                
                </div>
               
                </div>
                <Link className="linkFB" to="/searchProduct/food">
                <button  className="addFB" size="sm" block>
                  즐겨찾기 추가하러가기
                </button>
              </Link>
            </div>
        </div>
    );
}
export default NoFavourite;