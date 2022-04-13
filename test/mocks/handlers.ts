import { rest } from 'msw';
import { ROUTER_API } from '../../src';
import { quoteResponse } from './responses';

export const handlers = [
  rest.get(`${ROUTER_API}/quote`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(quoteResponse));
  }),
];
