import {
  Button,
  Col,
} from 'antd';
import { get } from 'lodash';
import {
  shape,
  string,
} from 'prop-types';

import style from './product.scss';

const Product = ({
  name,
  image,
}) => {
  let imageSrc = get(image, 'data');
  return (
    <Col span={12} className={style.column}>
      <div className={style.product}>
        <img className={style.imgProduct} src={imageSrc} alt={name} />
        <Button className={style.button}>{'Select >'}</Button>
      </div>
    </Col>
  );
};

Product.getInitialProps = () => ({
  namespacesRequired: ['page.home.product'],
});

Product.propTypes = {
  name: string.isRequired,
  image: shape({}).isRequired,
};

export default Product;
