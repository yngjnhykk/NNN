import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';

import wrapper from '../store/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const NodeBird = ({ Component }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          icon={false}
          closeButton={false}
          style={{ width: '17.3125rem', height: '3.375rem' }}
          theme='dark'
        />

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
