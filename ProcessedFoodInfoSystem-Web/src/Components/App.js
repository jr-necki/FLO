import React, { Component } from 'react';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import axios from 'axios';

class App extends Component {

  componentWillMount() {
    document.title = "KATI"

    console.log('새로 값 받는 부분---------');
    axios({
      url: 'http://13.124.55.59:8080/oauth-success',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authorization'),
      },
    })
      .then((response) => {
        console.log(response);
        console.log('새로값 받아서 response까지 받은 부분');
        if (response.status == 200) {
          axios({
            url: 'http://13.124.55.59:8080/login',
            method: 'POST',
            data: {
              email: localStorage.getItem('userBEmail'),
              password: localStorage.getItem('userBPassword'),
            },
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              console.log(
                'Create New Token// response받고 안에서 bLogin으로 또 실행',
              );
              localStorage.setItem(
                'authorization',
                response.headers.authorization,
              );
              console.log(localStorage.getItem('authorization'));
            })
            .catch((error) => {
              const status = error.response.status;
              console.log(status);
              localStorage.setItem('authorization', 'null');
            });
        } else if (response.status === 400) {
          axios({
            url: 'http://13.124.55.59:8080/login',
            method: 'POST',
            data: {
              email: localStorage.getItem('userLoginEmail'),
              password: localStorage.getItem('userLoginPassword'),
            },
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              console.log(
                'Create New Token// response받고 안에서 userLogin부분으로 또 실행',
              );
              localStorage.setItem(
                'authorization',
                response.headers.authorization,
              );
              console.log(localStorage.getItem('authorization'));
            })
            .catch((error) => {
              const status = error.response.status;
              console.log(status);
              localStorage.setItem('authorization', 'null');
            });
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.setItem('authorization', null);
      });
  }


  render() {
    return (
      <>
        <GlobalStyle />
        <Router />
      </>
    );
  }
}
export default App;
