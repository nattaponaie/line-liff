import {
  Divider,
  Row,
  Spin,
} from 'antd';
import { isEmpty } from 'lodash';

import { ASSET_PREFIX } from '/web-config';

import style from './home.scss';
import { useHome } from './homeHooks';
import Product from './product';

const HomePage = () => {
  const {
    errorMessages,
    allProductLoading,
    allProduct,
  } = useHome();
  console.log('allProduct', allProduct);


  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.imgLogo} src={`${ASSET_PREFIX}/static/images/line-cafe-logo.png`} alt="line-cafe" />
      </div>
      <Divider>
        <div className={style.headerText}>Coffee</div>
      </Divider>

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
          />
        ))}
      </Row>
      {/* <Row>
        <Product image='menu1.jpg' />
        <Product image='menu2.jpg' />
        <Product image='menu3.jpg' />
        <Product image='menu4.jpg' />
      </Row> */}
    </div>
  );
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default HomePage;
