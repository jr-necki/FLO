import React from 'react';
import { Button, Card, CardText, CardTitle, Col, Form, Input, Label, Row, Spinner, Table } from 'reactstrap';
import ReviewSummaryChart from './ReviewSummaryChart';
import ReactStars from 'react-rating-stars-component';
import { AiFillDelete, AiFillEdit, GiCancel, IoMdHeart, IoMdHeartEmpty } from 'react-icons/all';
import ReactPaginate from 'react-paginate';

const FoodReview = ({
                      reviews,
                      reviewSummary,
                      editTargetReview,
                      isLogin,
                      onClickEditReview,
                      editRatingChanged,
                      onClickDeleteReview,
                      onClickPage,
                      onClickPostEditReview,
                      onClickPostReview,
                      ratingChanged,
                      onClickReviewLikeButton,
                      onChangeEditReview, onChangeEditCancel, onChangeReview,
                    }) => {


  const drawStar = (rating) => {
    switch (rating) {
      case 5:
        return '★★★★★';
      case 4:
        return '★★★★☆';
      case 3:
        return '★★★☆☆';
      case 2:
        return '★★☆☆☆';
      case 1:
        return '★☆☆☆☆';

    }
  };
  return (
    <div className={'foodReview'}>
      {reviews !== null && reviewSummary !== null ? (
        <div>
          {/*<Row>*/}
          {/*  <Col className='reviewSummary'>*/}
          {/*    리뷰 수 <span className='subTitle'>{reviewSummary.reviewCount}   </span>*/}
          {/*    사용자 총 평점 <span className='subTitle'>{reviewSummary.avgRating}/5</span>*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          <Row className={'reviewInfo'}>
            <Col sm='3'>
              <Card body className={'reviewCount'}>
                <CardTitle className={'title'}>리뷰 수</CardTitle>
                <CardText className={'point'} >{reviewSummary.reviewCount}개</CardText>
              </Card>
            </Col>
            <Col sm='3'>
              <Card body className={'avgRating'}>
                <CardTitle className={'title'}>평균 점수</CardTitle>
                <CardText className={'point'}>{reviewSummary.avgRating}점</CardText>
              </Card>
            </Col>
            <Col sm='6'>
              <Card body className={'reviewSummary'}>
                <ReviewSummaryChart reviewSummary={reviewSummary} />
              </Card>

            </Col>
          </Row>


          <Table className='reviewTable'>
            <thead>
            <tr>
              <th width={'15%'}>별점</th>
              <th width={'10%'}>작성자</th>
              <th width={'25%'}>내용</th>
              <th width={'15%'}>작성일</th>
              <th width={'10%'}>좋아요</th>
              {isLogin === true ?
                <th width={'10%'} />
                : null}
            </tr>
            </thead>
            <tbody>
            {reviews.map((review, index) => (
              review.reviewId === editTargetReview.reviewId ? (
                <tr key={index}>
                  <td colSpan={1}>
                    <ReactStars
                      classNames ={'starRating'}
                      count={5}
                      onChange={editRatingChanged}
                      size={15}
                      activeColor='#fe9b5a'
                      isHalf={false}
                      edit={true} />
                  </td>
                  <td colSpan={4}>
                    <Input type='textarea' name='text' classname='reviewFrom' rows='4'
                           value={editTargetReview.reviewDescription}
                           onChange={(e) => onChangeEditReview(e)}
                    />
                  </td>
                  <td colSpan={1}>
                    <Button className={'editButton'}
                            onClick={() => onClickPostEditReview(editTargetReview)}>
                      <AiFillEdit />
                    </Button>
                    <Button className={'editCancelButton'}
                            onClick={() => onChangeEditCancel()}>
                      <GiCancel />
                    </Button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td style={{ color: '#fe9b5a', fontSize: '1.2em'}}>
                    {drawStar(review.reviewRating)}
                  </td>
                  <td>
                    {review.userName}
                  </td>
                  <td align={'left'}>
                    {review.reviewDescription}
                  </td>
                  <td>
                    {review.reviewCreatedDate.split('T')[0]}
                  </td>
                  <td>
                    {review.likeCount}
                  </td>
                  {isLogin === true ?
                    (<td>
                      {review.userCheck && (
                        <Button className={'editButton'}
                                onClick={() => onClickEditReview(review)}>
                          <AiFillEdit />
                        </Button>)}
                      {review.userCheck && (
                        <Button className={'deleteButton'}
                                onClick={() => onClickDeleteReview(review)}>
                          <AiFillDelete />
                        </Button>)}

                      {review.userCheck === false && <Button className='likeButton'
                                                             onClick={() => onClickReviewLikeButton(review)}>
                        {review.userLikeCheck === false && <IoMdHeartEmpty />}
                        {review.userLikeCheck === true && <IoMdHeart />}
                      </Button>}

                    </td>)
                    : null}
                </tr>
              )
            ))}
            </tbody>
          </Table>


          {/*<Col md={{ size: 8, offset: 2 }}>*/}
          <Col md={'12'} className={'pageDiv'}>
            {reviewSummary.reviewPageCount >= 2 ?
              <ReactPaginate pageCount={reviewSummary.reviewPageCount} pageRangeDisplayed={4}
                             marginPagesDisplayed={1}
                             previousLabel={'이전'} nextLabel={'다음'}
                             containerClassName={'reviewPaginate'}
                             pageClassName={'reviewPage'}
                             activeClassName={'reviewSelectedPage'}
                             onPageChange={onClickPage}
              /> :
              null}

          </Col>


          <Col lg={'12'}>
            <Form onSubmit={onClickPostReview}>
              <Label for='reviewFrom' className='reviewLabel'>사용자 후기 작성하기</Label>
              <span className='starRating'>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={20}
          activeColor='#fe9b5a'
          isHalf={false}
          edit={true}

        />
        </span>

              <Input type='textarea' name='text' classname='reviewFrom' rows='4'
                     onChange={(e) => onChangeReview(e)}
              />
              <Button type='submit' size='sm' className={'reviewSubmitButton'}>작성</Button>
            </Form>
          </Col>

        </div>
      ) : (<Spinner color='warning' />)}
      {/*상품 정보 우측 영역 끝 */}
    </div>
  );
};

export default React.memo(FoodReview);