import { NextApiRequest, NextApiResponse } from 'next';

import * as scrape from '../../lib/scrape';

export default async function all(req: NextApiRequest, res: NextApiResponse) {
  const androidAppId = req.query.androidAppId as string | undefined;
  const iOSAppId = req.query.iOSAppId as string | undefined;

  const response = await scrape.version(androidAppId, iOSAppId);
  return res.json(response);
}
