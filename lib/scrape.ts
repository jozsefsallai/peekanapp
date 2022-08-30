import googleplay, { IAppItemFullDetail } from 'google-play-scraper';
import appleappstore from 'app-store-scraper'; // no TS definitions for now
import { ScrapeError, ScrapeErrors } from './errors';

export interface ErrorResponse {
  error: ScrapeErrors;
  statusCode: number;
}

export interface AppDetails {
  playstore: IAppItemFullDetail | null;
  appstore: any | null;
  errors?: ErrorResponse[];
}

export async function playstore(appId: string): Promise<IAppItemFullDetail> {
  try {
    const playStoreDetails = await googleplay.app({ appId });
    return playStoreDetails;
  } catch (err: any) {
    if (err?.status === 404) {
      throw new ScrapeError(ScrapeErrors.AppNotFoundPlayStore, 404);
    }

    throw new ScrapeError(ScrapeErrors.ParseErrorPlayStore, 500);
  }
}

export async function appstore(appId: string): Promise<any> {
  try {
    const appStoreDetails = await appleappstore.app({ appId });
    return appStoreDetails;
  } catch (err: any) {
    if (err?.status === 404) {
      throw new ScrapeError(ScrapeErrors.AppNotFoundAppStore, 404);
    }

    throw new ScrapeError(ScrapeErrors.ParseErrorAppStore, 500);
  }
}

export async function all(
  androidAppId?: string,
  iOSAppId?: string,
): Promise<AppDetails> {
  const response: AppDetails = {
    playstore: null,
    appstore: null,
    errors: [],
  };

  if (typeof androidAppId !== 'undefined') {
    try {
      response.playstore = await playstore(androidAppId);
    } catch (err) {
      if (err instanceof ScrapeError) {
        response.errors!.push({
          error: err.code,
          statusCode: err.status,
        });
      } else {
        response.errors!.push({
          error: ScrapeErrors.UnknownError,
          statusCode: 500,
        });
      }
    }
  }

  if (typeof iOSAppId !== 'undefined') {
    try {
      response.appstore = await appstore(iOSAppId);
    } catch (err) {
      if (err instanceof ScrapeError) {
        response.errors!.push({
          error: err.code,
          statusCode: err.status,
        });
      } else {
        response.errors!.push({
          error: ScrapeErrors.UnknownError,
          statusCode: 500,
        });
      }
    }
  }

  return response;
}
