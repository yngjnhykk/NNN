import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const NodeBird = ({ Component }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta charSet='utf-8' />
          <link rel='icon' href='../icon/favicon.ico' />
          <title>NNN</title>
        </Head>
        <Component />
      </QueryClientProvider>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
