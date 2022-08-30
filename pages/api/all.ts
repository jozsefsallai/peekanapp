import { NextApiRequest, NextApiResponse } from 'next';

import * as scrape from '../../lib/scrape';

export default async function all(req: NextApiRequest, res: NextApiResponse) {
  const androidAppId = req.query.androidAppId as string | undefined;
  const iOSAppId = req.query.iOSAppId as string | undefined;

  const response = await scrape.all(androidAppId, iOSAppId);
  const status = !!response.errors?.length ? 500 : 200;
  return res.status(status).json(response);
}
