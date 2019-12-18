import {
  Divider,
  Row,
  Spin,
} from 'antd';
import { isEmpty } from 'lodash';

import style from './home.scss';
import { useHome } from './homeHooks';
import Product from './product';

const HomePage = () => {
  const {
    responseMessages,
    productList,
  } = useHome();

  return (
    <div className={style.container}>
      <Divider>
        <div className={style.headerText}>Coffee</div>
      </Divider>
      {isEmpty(productList) && <Spin />}
      {responseMessages && responseMessages}
      <Row>
        {!isEmpty(productList) && productList.map(({
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
