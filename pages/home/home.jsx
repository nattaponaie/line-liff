import {
  Button,
  Col, Divider, Row,
} from 'antd';

import { ASSET_PREFIX } from '/web-config';

import style from './home.scss';

const HomePage = () => {
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.imgLogo} src={`${ASSET_PREFIX}/static/images/line-cafe-logo.png`} alt="line-cafe" />
      </div>
      <Divider>
        <div className={style.headerText}>Coffee</div>
      </Divider>
      <Row>
        <Col span={12} className={style.column}>
          <div className={style.productLeft}>
            <img className={style.imgProduct} src={`${ASSET_PREFIX}/static/images/menu1.jpg`} alt="line-cafe" />
            <Button className={style.button}>{'Select >'}</Button>
          </div>
        </Col>
        <Col span={12} className={style.column}>
          <div className={style.productRight}>
            <img className={style.imgProduct} src={`${ASSET_PREFIX}/static/images/menu2.jpg`} alt="line-cafe" />
            <Button className={style.button}>{'Select >'}</Button>
          </div>
        </Col>
        <Col span={12} className={style.column}>
          <div className={style.productLeft}>
            <img className={style.imgProduct} src={`${ASSET_PREFIX}/static/images/menu3.jpg`} alt="line-cafe" />
            <Button className={style.button}>{'Select >'}</Button>
          </div>
        </Col>
        <Col span={12} className={style.column}>
          <div className={style.productRight}>
            <img className={style.imgProduct} src={`${ASSET_PREFIX}/static/images/menu4.jpg`} alt="line-cafe" />
            <Button className={style.button}>{'Select >'}</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default HomePage;
