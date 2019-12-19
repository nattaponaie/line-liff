import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';
import multer from 'multer';

import { product } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { SSE_GET_PRODUCT_EVENT } from '/server-config';
import { apiResponse } from '/utils/json';
import {
  closeSSEConnection, initializeSSE, sendSSEMessage,
} from '/utils/sse';

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

router.get(
  '/products',
  asyncWrapper(async (_, res) => {
    const result = await product.findAll();
    res.json(apiResponse({ resource, response: result }));
  })
);

router.get(
  '/products/sse',
  asyncWrapper(async (req, res) => {
    const clientId = `${resource}:${Date.now()}`;
    let clients = [initializeSSE({ res, resource, clientId })];

    const productInterval = setInterval(async () => {
      const eventName = SSE_GET_PRODUCT_EVENT;
      try {
        const result = await product.findAll();
        sendSSEMessage({
          clients,
          eventName,
          resource,
          message: result,
        });
      } catch (err) {
        sendSSEMessage({
          clients,
          eventName,
          resource,
          message: err,
        });

        closeSSEConnection({
          clients,
          clientId,
        });
        clearInterval(productInterval);
        return err;
      }
    }, 10000);

    req.on('close', () => {
      clearInterval(productInterval);
      closeSSEConnection({
        clients,
        clientId,
      });
    });

  })
);

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
