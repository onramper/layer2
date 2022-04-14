import { rest } from 'msw';
import { ROUTER_API } from '../../src';
import { quoteResponse } from './responses';

// const validTokenInAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab';

export const handlers = [
  // HAPPY PATH
  rest.get(`${ROUTER_API}/quote`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(quoteResponse));
  }),

  // SAD PATHS - (dummy urls, to test handling of known quote API errors)

  rest.get('api400', (req, res, ctx) => {
    const { invalidAddress } = req.params;
    return res(
      ctx.status(400),
      ctx.json({
        statusCode: 400,
        errorCode: 'TOKEN_IN_INVALID',
        detail: `Could not find token with address "${invalidAddress}"`,
      })
    );
  }),

  rest.get(`api422`, (_, res, ctx) => {
    return res(
      ctx.status(422),
      ctx.json({
        statusCode: 422,
        errorCode: 'VALIDATION_ERROR',
        detail: 'Invalid JSON body',
      })
    );
  }),

  rest.get('api500', (_, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        statusCode: 500,
        errorCode: 'INTERNAL_ERROR',
        detail: 'Unexpected error',
      })
    );
  }),

  rest.get('api300', (_, res, ctx) => {
    return res(
      ctx.status(300),
      ctx.json({
        statusCode: 300,
        errorCode: 'UNRECOGNIZED_ERROR',
        detail: 'This is not something our api should be returning',
      })
    );
  }),
];
