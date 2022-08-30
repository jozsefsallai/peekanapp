import { NextApiRequest, NextApiResponse } from 'next';
import { ScrapeError } from '../../lib/errors';

import * as scrape from '../../lib/scrape';

export default async function appstore(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const appId = req.query.appId as string | undefined;

  if (typeof appId !== 'string' || appId.length === 0) {
    return res.status(400).json({
      error: 'MissingAppStoreAppId',
    });
  }

  try {
    const response = await scrape.appstore(appId);
    return res.status(200).json(response);
  } catch (err: any) {
    if (err.name === 'ScrapeError') {
      const error = err as ScrapeError;
      return res.status(error.status).json({
        error: error.code,
      });
    }

    return res.status(500).json({
      error: 'UnknownError',
    });
  }
}
