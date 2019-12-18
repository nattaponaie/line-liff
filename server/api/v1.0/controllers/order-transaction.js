import express from 'express';

import { orderTransaction } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
const resource = 'order-transactions';

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
  '/order-transactions',
  asyncWrapper(async (_, res) => {
    const result = await orderTransaction.getAllOrderTransaction();
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
