import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';
import multer from 'multer';

import { product } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
const upload = multer();
const resource = 'product';

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
  '/products',
  upload.single('productImage'),
  asyncWrapper(async (req, res) => {
    const productName = get(req.body, 'productName');
    const productImage = get(req, 'file');
    const price = get(req.body, 'price');
    const result = await product.create({ productName, productImage, priceValue: price });
    res.json(apiResponse({ resource, response: result }));
  })
);

router.patch(
  '/products/:id',
  validate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      statusName: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const { id } = req.params || {};
    const statusName = get(req.body, 'statusName');
    const result = await product.update({ statusName, productId: id });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
