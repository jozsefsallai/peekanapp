export enum ScrapeErrors {
  AppNotFoundPlayStore = 'AppNotFoundPlayStore',
  AppNotFoundAppStore = 'AppNotFoundAppStore',
  ParseErrorPlayStore = 'ParseErrorPlayStore',
  ParseErrorAppStore = 'ParseErrorAppStore',
  UnknownError = 'UnknownError',
}

export class ScrapeError extends Error {
  public readonly statusCode?: number;

  constructor(public readonly code: ScrapeErrors, statusCode?: number) {
    super(code);
    this.statusCode = statusCode;
    this.name = 'ScrapeError';
  }

  get status(): number {
    return this.statusCode ?? 500;
  }
}
