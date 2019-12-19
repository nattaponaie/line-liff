import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';

import { orderTransaction } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import {
  SSE_GET_ORDER_EVENT,
  SSE_GET_ORDER_TRANSACTION_EVENT,
} from '/server-config';
import { apiResponse } from '/utils/json';
import {
  closeSSEConnection, initializeSSE, sendSSEMessage,
} from '/utils/sse';

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

router.get(
  '/order-transactions/sse',
  asyncWrapper(async (req, res) => {
    const clientId = `${resource}:${Date.now()}`;
    let clients = [initializeSSE({ res, resource, clientId })];

    const orderTransactionInterval = setInterval(async () => {
      const eventName = SSE_GET_ORDER_TRANSACTION_EVENT;
      try {
        const result = await orderTransaction.getAllOrderTransaction();
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
        clearInterval(orderTransactionInterval);
        return err;
      }
    }, 10000);

    req.on('close', () => {
      clearInterval(orderTransactionInterval);
      closeSSEConnection({
        clients,
        clientId,
      });
    });

  })
);

router.get(
  '/order-transactions/line-user-id/:id/sse',
  validate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {

    const clientId = `${resource}:${Date.now()}`;
    let clients = [initializeSSE({ res, resource, clientId })];

    const orderTransactionInterval = setInterval(async () => {
      const eventName = SSE_GET_ORDER_EVENT;
      try {
        const { id } = req.params || {};
        const result = await orderTransaction.getAllOrderByLineUserId({ lineUserId: id });
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
        clearInterval(orderTransactionInterval);
        return err;
      }
    }, 10000);

    req.on('close', () => {
      clearInterval(orderTransactionInterval);
      closeSSEConnection({
        clients,
        clientId,
      });
    });

  })
);

export default router;
