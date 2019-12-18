import Head from 'next/head';
import { element } from 'prop-types';

import { ASSET_PREFIX } from '/web-config';

import style from './Layout.scss';

const Layout = ({
  children,
}) => {

  return (
    <div>
      <Head>
        <title>Line LIFF</title>

        <link rel="shortcut icon" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <link rel="icon" type="image/png" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="apple-touch-icon" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <meta name="theme-color" content="#FA4616" />
        <meta name="apple-mobile-web-app-title" content="Line LIFF" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        <script src="https://static.line-scdn.net/liff/edge/2.1/sdk.js" />
      </Head>
      <header>
        <div className="header" />
      </header>
      <>
        <div className={style.logoContainer}>
          <img className={style.imgLogo} src={`${ASSET_PREFIX}/static/images/line-cafe-logo.png`} alt="line-cafe" />
        </div>
        {children}
      </>
      <footer>
        {/* {'Footer'} */}
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: element.isRequired,
};

Layout.defaultProps = {
};

export default Layout;
