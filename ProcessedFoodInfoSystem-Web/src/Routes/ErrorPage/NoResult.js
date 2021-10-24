import {BsExclamationOctagon} from "react-icons/bs";
import {FaCheckCircle} from "react-icons/fa";
import "./NoResult.scss";
const  NoResult=()=>{
    return (
        <div className="page">
           
            <div className="content">
                 <BsExclamationOctagon className="icon" size="20"></BsExclamationOctagon>
                <h1 className="title"> 요청하신 검색어의 결과가 없습니다. </h1>
                <div className="check">
                <div className="checklist"><FaCheckCircle size="20"></FaCheckCircle> 검색어의 철자가 정확한지 확인해 주세요.</div>
                <div className="checklist"><FaCheckCircle size="20"></FaCheckCircle> 검색어의 수를 줄이거나 다른 단어를 사용해 보세요.</div>
                <div className="checklist"><FaCheckCircle size="20"></FaCheckCircle> 일반적인 단어를 사용해 보세요.</div>
                </div>
            </div>
        </div>
    );
}
export default NoResult;