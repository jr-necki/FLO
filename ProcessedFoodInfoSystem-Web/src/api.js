import axios from 'axios';
import UserRanking from 'Routes/UserRanking';

const api = axios.create({
  baseURL: 'http://13.124.55.59:8080/',
});

//User 관련 부분

//아이디 삭제
export const userWithdrawal = {
  deleteUser: (password) =>
    api.post(
      '/api/v1/user/withdraw',
      { password: password },
      { headers: { Authorization: localStorage.getItem('authorization') } },
    ),
};

//이메일 찾기 부분
export const findEmail = {
  findUserEmail: (secondEmail) =>
    api.post(
      '/find-email',
      { secondEmail: secondEmail },
      { headers: { Authorization: localStorage.getItem('authorization') } },
    ),
};

//사용자 가입 부분
export const userJoin = {
  userRegister: (name, password, address, birth, email) =>
    api.post(
      '/signup',
      {
        name: name,
        password: password,
        address: address,
        birth: birth,
        email: email,
      },
      { headers: { 'Content-Type': 'application/json' } },
    ),
};

//로그인 부분
export const userLogin = {
  userLoginApi: (email, password) =>
    api.post(
      '/login',
      { email: email, password: password },
      { headers: { 'Content-Type': 'application/json' } },
    ),
};

//비밀번호 변경 부분
export const userChangePW = {
  changePW: (beforePassword, afterPassword) =>
    api.post(
      '/api/v1/user/modify-password',
      { beforePassword: beforePassword, afterPassword: afterPassword },
      { headers: { Authorization: localStorage.getItem('authorization') } },
    ),
};

//유저 정보 변경 부분
export const changeUserInfoApi = {
  changeUserInfo: (address, birth, name) =>
    api.post(
      '/api/v1/user/modify-user-info',
      { address: address, birth: birth, name: name },
      {
        headers: { Authorization: localStorage.getItem('authorization') },
      },
    ),
};

//유저 알러지 등록하는 부분
export const setUserAllergyInfo = {
  setAllergies: (allergyList) =>
    api.post(
      '/api/v1/user/createUserAllergy',
      {
        allergyList: allergyList,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

//유저 알러지 가져오는 부분
export const getUserAllergyInfo = {
  userAllergies: () =>
    api.get('api/v1/user/readUserAllergy', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

//유저 기록 가져오는 부분
export const getUserSummary = {
  userSummary: () =>
    api.get('api/v1/user/summary', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

//대분류 소트
export const bigCategory = {
  gotoCategory: (category, page, sort, size) =>
    api.get('api/v1/food/list/widecategory', {
      params: {
        category: category,
        page: page,
        sort: sort,
        size: size,
      },
    }),
};

//2차 보안 이메일 설정 부분
export const setSecurityEmail = {
  securityEmail: (secondEmail) =>
    api.post(
      '/api/v1/user/set-secondEmail',
      { secondEmail: secondEmail },
      { headers: { Authorization: localStorage.getItem('authorization') } },
    ),
};

export const searchApi = {
  //해당 url로 가는 함수들
  search: (allergies,category,foodName,manufacturerName,order,pageNo,size,sort) =>
    api.get('/api/v1/food/searchFood', {
      params: {
        allergies: allergies.join(','),
        category: category,
        foodName:foodName,
        manufacturerName:manufacturerName,
        order:order,
        pageNo: pageNo,
        size: size,
        sort: sort,
      },
    }),
};
export const manufacturerApi = {
  //해당 url로 가는 함수들
  search: (term, sort, allergies) =>
    api.get('/api/v1/food/getFoodListBySorting', {
      params: {
        manufacturerName: term,
        pageNo: 1,
        size: 10,
        sort: sort,
        allergies: allergies.join(','),
      },
    }),
};

export const foodDetailApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/food/findFood/foodDetail', {
      params: {
        foodId: term,
      },
    }),
};

export const adFoodDetailApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/advertisement/foodDetail', {
      params: {
        adId: term,
      },
    }),
};

export const findPasswordApi = {
  //해당 url로 가는 함수들
  postEmail: (email) =>
    api.post('/find-password', {
      email: email,
    }),
};

export const getAdvertisementFoodApi = {
  getAdFood: () => api.get('/api/v1/advertisement/ads'),
};

export const postReviewApi = {
  //해당 url로 가는 함수들
  postReview: (review) =>
    api.post(
      '/api/v1/user/createReview',
      {
        foodId: review.foodId,
        reviewDescription: review.reviewDescription,
        reviewRating: review.reviewRating,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const editReviewApi = {
  //해당 url로 가는 함수들
  editReview: (review) =>
    api.post(
      '/api/v1/user/updateReview',
      {
        reviewId: review.reviewId,
        reviewDescription: review.reviewDescription,
        reviewRating: review.reviewRating,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const deleteReviewApi = {
  //해당 url로 가는 함수들
  deleteReview: (review) =>
    api.post(
      '/api/v1/user/deleteReview',
      {
        reviewId: review.reviewId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const getReviewsByFoodId = {
  getReviews: (foodId, pageNum) =>
    api.get('/readReview', {
      params: {
        foodId: foodId,
        pageNum: pageNum,
      },
    }),
};
export const getReviewsByFoodIdWithLogin = {
  getReviews: (foodId, pageNum) =>
    api.get('/api/v1/user/readReview', {
      params: {
        foodId: foodId,
        pageNum: pageNum,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const addFavoriteApi = {
  //해당 url로 가는 함수들
  addFavorite: (foodId) =>
    api.post(
      '/api/v1/user/favorite/addFavorite',
      {},
      {
        params: {
          foodId: foodId,
        },
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const deleteFavoriteApi = {
  //해당 url로 가는 함수들
  deleteFavorite: (foodId) =>
    api.delete('/api/v1/user/favorite/deleteFavorite', {
      params: {
        foodId: foodId,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const checkFavoriteApi = {
  checkFavorite: (foodId) =>
    api.get('/api/v1/user/favorite/checkFavorite', {
      params: {
        foodId: foodId,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const favouriteApi = {
  myFavourite: () =>
    api.get('api/v1/user/favorite/list', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const getWrittenReport = {
  userReport: () =>
    api.get('api/v1/user/summary', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const reviewLikeApi = {
  //해당 url로 가는 함수들
  updateLike: (review) =>
    api.post(
      '/api/v1/user/updateReviewLike',
      {
        likeCheck: review.userLikeCheck,
        reviewId: review.reviewId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const sortApi = {
  sortBy: (foodName, sort) =>
    api.get('api/v1/food/getFoodListBySorting', {
      params: {
        foodName: foodName,
        pageNo: 1,
        size: 10,
        sort: sort,
      },
    }),
};
export const categoryApi = {
  category: (category,page,size,sort) =>
    api.get('/api/v1/food/list/category', {
      params: {
        category: category,
        page: page,
        sort:sort,
        size: size
        
      },
    }),
};

export const getReviewRankingApi = {
  getReviewRanking: () => api.get('/reviewRanking'),
};

export const getProductRanking = {
  mainPage: () => api.get('/reviewRanking'),
};

export const getAd = {
  atMainPage: () => api.get('/api/v1/advertisement/ads'),
};

export const allergyApi = {
  sortManufacturer: (sort, manufacturerName, allergies) =>
    api.get('/api/v1/food/getFoodListBySorting', {
      params: {
        pageNo: 1,
        size: 10,
        sort: sort,
        manufacturerName: manufacturerName,
        allergies: allergies.join(','),
      },
    }),
  sortFood: (sort, foodName, allergies) =>
    api.get('/api/v1/food/getFoodListBySorting', {
      params: {
        pageNo: 1,
        size: 10,
        sort: sort,
        manufacturerName: foodName,
        allergies: allergies.join(','),
      },
    }),
};

export const getReviewByUserIDApi = {
  getReviews: (pageNum) =>
    api.get('/api/v1/user/readReviewByUserID', {
      params: {
        pageNum: pageNum,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const getUserInfoApi = {
  gerUserInfo: () =>
    api.get('/api/v1/user/user-info', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

