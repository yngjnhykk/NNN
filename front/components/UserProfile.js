import { Button } from 'antd';
import { Card, Avatar } from 'antd/dist/antd';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';
import Logout from '../assets/icon/Logout';

function UserProfile() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const profilePath = '/profile';

  return (
    <Card
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`}>
            <a>게시글</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          <Link href={profilePath}>
            <a>팔로잉</a>
          </Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key='followers'>
          <Link href={profilePath}>
            <a>팔로워</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Logout onLogOut={onLogOut} />
    </Card>
  );
}

export default UserProfile;
