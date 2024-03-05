import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { TextField } from '@mui/material';
import styled from 'styled-components';
import { useCallback } from 'react';

import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

function NicknameEditForm() {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20, borderRadius: 6 }}>
      <InputWrapper>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, fontSize: 15, fontWeight: '500' }}>회원정보 수정</div>
        <Input.Search value={nickname} onChange={onChangeNickname} onSearch={onSubmit} addonBefore='닉네임' enterButton='수정' style={{ borderRadius: 6 }} />
      </InputWrapper>
    </Form>
  );
}

export default NicknameEditForm;

const InputWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  border-radius: 6px;
`;
