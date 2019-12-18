import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';

import { order } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
const resource = 'order';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: "Find all products information"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     tags:
 *       - "Product"
 *
 *     responses:
 *       200:
 *         description: OK
 */

router.post(
  '/orders',
  validate({
    body: Joi.object().keys({
      productId: Joi.number().required(),
      userId: Joi.number().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const productId = get(req.body, 'productId');
    const userId = get(req.body, 'userId');
    const result = await order.create({ productId, userId });
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
