import App from 'next/app';

import Layout from '/components/Layout/Layout';

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
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </div>
    );
  }
}

export default MyApp;
