import {
  Button,
  Col,
} from 'antd';
import { string } from 'prop-types';

import { ASSET_PREFIX } from '/web-config';

import style from './product.scss';

const Product = ({
  image,
}) => {
  return (
    <Col span={12} className={style.column}>
      <div className={style.product}>
        <img className={style.imgProduct} src={`${ASSET_PREFIX}/static/images/${image}`} alt="line-cafe" />
        <Button className={style.button}>{'Select >'}</Button>
      </div>
    </Col>
  );
};

Product.getInitialProps = () => ({
  namespacesRequired: ['page.home.product'],
});

Product.propTypes = {
  image: string.isRequired,
};

export default Product;
