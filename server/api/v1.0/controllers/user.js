import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';

import { user } from '/api/v1.0/business-logics';
import asyncWrapper from '/middleware/async-wrapper';
import { apiResponse } from '/utils/json';

const router = express.Router();
const resource = 'user';

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
  '/users',
  validate({
    body: Joi.object().keys({
      lineUserId: Joi.string().required(),
      displayName: Joi.string().required(),
      roleName: Joi.string(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const lineUserId = get(req.body, 'lineUserId');
    const displayName = get(req.body, 'displayName');
    const roleName = get(req.body, 'roleName');
    const result = await user.create({ lineUserId, displayName, roleName });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
