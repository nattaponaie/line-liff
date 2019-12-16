import express from 'express';

// import validate from 'express-validation';
// import Joi from 'joi';
// import { get } from 'lodash';
// import { product } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
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
    const result = { test: 'test' };
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
