import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd/dist/antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

function LoginForm() {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 로그인 에러 알림
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  // 로그인
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-email'>이메일</label>
        <br />
        <Input name='user-email' type='email' value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br />
        <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
      </div>

      <ButtonWraper>
        <Button type='primary' htmlType='submit' loading={logInLoading}>
          로그인
        </Button>
        <Link href='/signup'>
          <Button>회원가입</Button>
        </Link>
      </ButtonWraper>
    </FormWrapper>
  );
}

export default LoginForm;

const ButtonWraper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
