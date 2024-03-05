import { Button } from 'antd';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLodaing } = useSelector((state) => state.user);

  const isFollowing = me?.Followings.find((it) => it.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({ type: UNFOLLOW_REQUEST, data: post.User.id });
    } else {
      dispatch({ type: FOLLOW_REQUEST, data: post.User.id });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLodaing} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
