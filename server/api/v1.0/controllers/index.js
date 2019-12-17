import BaseRoute from '/api/_baseRoute';

import order from './order';
import product from './product';
import user from './user';

export default BaseRoute({
  version: '1.0',
  routes: [
    product,
    user,
    order,
  ],
});
