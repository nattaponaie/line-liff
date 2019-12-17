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
      productName: Joi.string().required(),
      productImage: Joi.string().required(),
      price: Joi.number().required(),
      userId: Joi.number().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const productName = get(req.body, 'productName');
    const productImage = get(req.body, 'productImage');
    const price = get(req.body, 'price');
    const userId = get(req.body, 'userId');
    const result = await order.create({ productName, productImage, price, userId });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
