import express from 'express';

import { orderTransaction } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { SSE_GET_ORDER_EVENT } from '/server-config';
import { apiResponse } from '/utils/json';
import { logInfo } from '/utils/logger';

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
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });

    let clients = [];
    const clientId = `${resource}:${Date.now()}`;
    const newClient = {
      id: clientId,
      res,
    };
    clients.push(newClient);

    const productInterval = setInterval(async () => {
      const result = await orderTransaction.getAllOrderTransaction();
      const eventName = SSE_GET_ORDER_EVENT;
      clients.forEach(c => {
        c.res.write('event: ' + eventName + '\n');
        c.res.write('data: ' + JSON.stringify(apiResponse({ resource, response: result })) + '\n\n');
      });
    }, 5000);

    req.on('close', () => {
      clearInterval(productInterval);
      logInfo(`${clientId} Connection closed`);
      clients = clients.filter(c => c.id !== clientId);
    });

  })
);

export default router;
