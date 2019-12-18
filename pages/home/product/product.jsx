import {
  Button,
  Col,
  Spin,
} from 'antd';
import { get } from 'lodash';
import {
  number,
  shape,
  string,
} from 'prop-types';

import style from './product.scss';
import { useProduct } from './productHooks';

const Product = ({
  productId,
  name,
  image,
}) => {
  const {
    createOrderLoading,
    onProductClick,
  } = useProduct({ productId });
  let imageSrc = get(image, 'data');

  return (
    <Col span={12} className={style.column}>
      <div className={style.product}>
        <img className={style.imgProduct} src={imageSrc} alt={name} />
        {createOrderLoading ? <Spin /> :
        (
          <Button
            className={style.button}
            onClick={onProductClick}
          >
            {'Select >'}
          </Button>
        )}
      </div>
    </Col>
  );
};

Product.getInitialProps = () => ({
  namespacesRequired: ['page.home.product'],
});

Product.propTypes = {
  productId: number.isRequired,
  name: string.isRequired,
  image: shape({}).isRequired,
};

export default Product;
