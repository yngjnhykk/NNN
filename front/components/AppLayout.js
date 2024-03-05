import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Avatar } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import UserProfile from './UserProfile';
import useInput from '../hooks/useInput';
import LoginForm from './LoginForm';
import { useQuery } from 'react-query';
import { backUrl } from '../config/config';
import axios from 'axios';

const fetcher = async () => {
  try {
    const response = axios.get(`${backUrl}/user/followings?limit=10`, { withCredentials: true });
    console.log(backUrl);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const me = useSelector((state) => state.user.me);

  const { data, refetch } = useQuery('followData', fetcher, { enabled: me ? true : false });

  useEffect(() => {
    refetch();
  }, [me]);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const onClickUser = useCallback((id) => {
    Router.push(`/user/${id}`);
  });

  return (
    <div>
      <Global />
      <Menu mode='vertical'>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            <Menu.Item key='home'>
              <Link href='/'>
                <a style={{ fontSize: 20, fontWeight: '500' }}>NNN</a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key='profile'>
              <Link href='/profile'>
                <a>프로필</a>
              </Link>
            </Menu.Item> */}
          </Col>
          <Col xs={24} md={12}>
            <Menu.Item key='mail' style={{}}>
              <Input.Search
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
                style={{ verticalAlign: 'middle', width: '100%', borderRadius: 6 }}
                placeholder='해시태그를 입력해주세요.'
              />
            </Menu.Item>
          </Col>
          <Col xs={24} md={6}>
            {me ? (
              <Menu.Item key='signup' style={{ float: 'right' }}>
                <Link href='/signup'>
                  <a>
                    <Button style={{ borderRadius: 6 }}>회원가입</Button>
                  </a>
                </Link>
              </Menu.Item>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href='https://web-resume-phi.vercel.app/' target='_blank' rel='noreferrer noopener'>
            Made by 양진혁
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 20, marginLeft: 5 }}>
            {data ? (
              data.data.map((item, i) => (
                <div
                  onClick={() => {
                    onClickUser(item.id);
                  }}
                  style={{ display: 'flex', alignItems: 'center', height: 50, gap: 10, fontSize: 15, fontWeight: '500', cursor: 'pointer' }}
                >
                  <Avatar>{item.nickname}</Avatar>
                  {item.nickname}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Global = createGlobalStyle`
.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-col:first-child {
  padding-left: 0 !important;
}

.ant-col:last-child {
  padding-right: 0 !important;
}

`;
export default AppLayout;
