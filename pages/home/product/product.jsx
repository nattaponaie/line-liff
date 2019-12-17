import {
  Button,
  Col,
} from 'antd';
import { get } from 'lodash';
import { string } from 'prop-types';

import style from './product.scss';

const Product = ({
  name,
  image,
}) => {
  const imageSrc = get(image, ['data', 'data']);
  console.log('imageSrc', imageSrc);

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
  image: string.isRequired,
};

export default Product;
