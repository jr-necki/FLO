import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header';

import MS from '../Routes/MainScreen/MainScreen';
import CP from '../Routes/CommercialProduct';
import RP from '../Routes/RecommendedProduct';
import SPF from '../Routes/Search/SearchProductFood';

import CM from '../Routes/Community';

import UR from '../Routes/UserRanking';
import PR from '../Routes/ProductRanking/ProductReviewRanking';
import RV from '../Routes/Reviews';
import WK from '../Routes/WhatsKati';
import HU from '../Routes/HowToUse';
import FD from '../Routes/Food/FoodDetail';
import FUE from '../Routes/FindUser/FindEmail';
import FUP from '../Routes/FindUser/FindPassword';

import LG from '../Routes/Login/Login';
import Join from '../Routes/Join/Join';
import DU from '../Routes/DeleteUser/DeleteUser';
import MP from '../Routes/MyPage/MyPage';
import MPD from '../Routes/MyPage/MyPageDetail';
import CUP from '../Routes/MyPage/ChangePassword';
import MF from '../Routes/MyPage/MyFavourite';
import CUI from '../Routes/MyPage/ChangeUserInfo';
import UAI from '../Routes/MyPage/MyAllergies';
import SE from '../Routes/MyPage/SecondEmail';
import AB from '../Routes/MainScreen/About';
import Footer from './Footer';

import SNACK from '../Routes/Category/Snack';
import MILK from '../Routes/Category/Milk';
import MEAT from '../Routes/Category/Meat';
import MATERIAL from '../Routes/Category/Material';
import TEA from '../Routes/Category/Tea';
import FOOD from '../Routes/Category/Food';
import KIMCHI from '../Routes/Category/Kimchi';
import CON from '../Routes/Category/Condiment';
import MKIT from '../Routes/Category/MealKit';
import ETC from '../Routes/Category/Etc';


export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={MS} />
        <Route path="/commercialProduct" exact component={CP} />
        <Route path="/recommendedProduct" exact component={RP} />

        <Route path="/searchProduct/food" exact component={SPF} />

        <Route path="/searchProduct/food/:id" exact component={FD} />
        <Route path="/searchProduct/bssh/:id" exact component={FD} />
        <Route path="/login" exact component={LG} />
        <Route path="/join" exact component={Join} />
        <Route path="/delete" exact component={DU} />
        <Route path="/mypage" exact component={MP} />
        <Route path="/mypageDetail" exact component={MPD} />
        <Route path="/changePassword" exact component={CUP} />
        <Route path="/myFavourite" exact component={MF} />
        <Route path="/changeUserInfo" exact component={CUI} />
        <Route path="/userAllergyInfo" exact component={UAI} />
        <Route path="/secondEmail" exact component={SE} />
        <Route path="/about" exact component={AB} />

        <Route path="/findUser/email" exact component={FUE} />
        <Route path="/findUser/password" exact component={FUP} />
        <Route path="/productRanking" exact component={PR} />

        <Route path="/category/snack" exact component={SNACK} />
        <Route path="/category/milk" exact component={MILK} />
        <Route path="/category/tea" exact component={TEA} />
        <Route path="/category/food" exact component={FOOD} />
        <Route path="/category/kimchi" exact component={KIMCHI} />
        <Route path="/category/con" exact component={CON} />
        <Route path="/category/mealKit" exact component={MKIT} />
        <Route path="/category/etc" exact component={ETC} />
        <Route path="/category/material" exact component={MATERIAL} />
        <Route path="/category/meat" exact component={MEAT} />


        
        {/* url잘못치면 메인으로 */}
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </>
  </Router>
);