import App from 'next/app';

import Layout from '/components/Layout/Layout';
import { UserContextProvider } from '/contexts/UserContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="App">
        <UserContextProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </div>
    );
  }
}

export default MyApp;
