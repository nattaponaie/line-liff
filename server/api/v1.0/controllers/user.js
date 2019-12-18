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
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      roleName: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const firstName = get(req.body, 'firstName');
    const lastName = get(req.body, 'lastName');
    const roleName = get(req.body, 'roleName');
    const result = await user.create({ firstName, lastName, roleName });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
