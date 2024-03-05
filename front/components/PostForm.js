import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import useInput from '../hooks/useInput';

import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';
import { backUrl } from '../config/config';

function PostForm() {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // 게시글 작성

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i);
    });
    formData.append('content', text);
    return dispatch({ type: ADD_POST_REQUEST, data: formData });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 미리보기 이미지 변경
  const onChnageImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({ type: UPLOAD_IMAGES_REQUEST, data: imageFormData });
  });

  // 미리보기 이미지 삭제
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <FormWrapper encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='입력해주세요.'
        style={{ height: 100, borderRadius: 10, marginBottom: 10 }}
      />
      <div>
        <input type='file' name='image' multiple hidden ref={imageInput} onChange={onChnageImages} />
        <Button onClick={onClickImageUpload} style={{ borderRadius: 6 }}>
          이미지 업로드
        </Button>
        <Button type='primary' style={{ float: 'right', borderRadius: 6 }} htmlType='submit'>
          올리기
        </Button>
      </div>
      <div>
        {imagePaths.map((item, i) => (
          <div key={item} style={{ display: 'inline-block' }}>
            <img src={`${backUrl}/${item}`} style={{ width: '200px' }} alt={item} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
}

export default PostForm;

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;
