import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';

import { order } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
const resource = 'order';

router.post(
  '/orders',
  validate({
    body: Joi.object().keys({
      productId: Joi.number().required(),
      lineUserId: Joi.string().required(),
      displayName: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const productId = get(req.body, 'productId');
    const lineUserId = get(req.body, 'lineUserId');
    const displayName = get(req.body, 'displayName');
    const result = await order.create({ productId, lineUserId, displayName });
    res.json(apiResponse({ resource, response: result }));
  })
);

router.patch(
  '/orders/:id/status',
  validate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      status: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const { id } = req.params || {};
    const status = get(req.body, 'status');
    const result = await order.updateStatus({ orderId: id, status });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
