import {
  Divider,
  Row,
  Spin,
} from 'antd';
import { isEmpty } from 'lodash';

import style from './home.scss';
import {
  useHome, useHomeSSE,
} from './homeHooks';
import Product from './product';

const HomePage = () => {
  const {
    responseMessages,
    appendResponseMessage,
    allProductLoading,
    allProduct,
    allProductWrapper,
  } = useHome();
  useHomeSSE({ appendResponseMessage, allProductWrapper });

  return (
    <div className={style.container}>
      <Divider>
        <div className={style.headerText}>Coffee</div>
      </Divider>
      {allProductLoading && <Spin />}
      {responseMessages && responseMessages}
      <Row>
        {!isEmpty(allProduct) && allProduct.map(({
          id,
          name,
          image,
        }) => (
          <Product
            key={`${id}${name}`}
            name={name}
            image={image}
            productId={id}
          />
        ))}
      </Row>
    </div>
  );
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default HomePage;
