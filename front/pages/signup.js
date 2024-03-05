import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, logInDone } = useSelector((state) => state.user);

  // 로그인에 성공했다면,
  useEffect(() => {
    if (logInDone) {
      Router.replace('/');
    }
  }, [logInDone]);

  // 회원이라면, 메인페이지로 이동
  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  // 회원가입에 실패 알림
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 회원가입
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return;
    }
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password, nickname } });
  }, [email, password, passwordCheck, term]);

  const onChangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  //

  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>NNN</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor='user-email'>이메일</label>
            <br />
            <Input name='user-email' type='email' value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor='user-nick'>닉네임</label>
            <br />
            <Input name='user-nick' value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor='user-password'>비밀번호</label>
            <br />
            <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor='user-password-check'>비밀번호체크</label>
            <br />
            <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
            {passwordError && <RedText style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</RedText>}
          </div>
          <div>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              개인정보 이용에 동의합니다.
            </Checkbox>
            {termError && <RedText style={{ color: 'red' }}>약관에 동의하셔야 합니다.</RedText>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type='primary' htmlType='submit' loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;

const RedText = styled.div`
  color: red;
`;
