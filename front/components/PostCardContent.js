import PropTypes from 'prop-types';
import Link from 'next/link';

function PostCardContent({ postData }) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((item) => {
        if (item.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${item.slice(1)}`} key={item.id}>
              {item}
            </Link>
          );
        }
        return item;
      })}
    </div>
  );
}

export default PostCardContent;

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
