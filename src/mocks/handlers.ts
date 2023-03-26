import { rest } from 'msw';

export const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    async (req, res, ctx) => {
      const request = await req.json();
      const { email } = request;

      if (email === 'email@test.com') {
        return res(
          ctx.status(201),
          ctx.json({
            msg: 'Successfully logged in!',
          }),
        );
      }
      return res(ctx.status(500), ctx.json({ msg: 'Error while logging in' }));
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/travel`,

    (_req, res, ctx) => {
      return res.once(ctx.status(500), ctx.json(null));
    },
  ),
];
