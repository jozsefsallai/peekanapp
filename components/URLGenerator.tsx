import { useEffect, useState } from 'react';

enum Mode {
  PlayStore = 'Google Play Store',
  AppStore = 'Apple App Store',
  Both = 'Both',
  Version = 'Version',
}

function generateURL(
  mode: Mode,
  androidAppId: string,
  iOSAppId: string,
): string {
  if (typeof window === 'undefined') {
    return '';
  }

  if (mode === Mode.PlayStore && androidAppId.length > 0) {
    const url = new URL(`${window.location.href}api/playstore`);
    url.searchParams.set('appId', androidAppId);
    return url.href;
  }

  if (mode === Mode.AppStore && iOSAppId.length > 0) {
    const url = new URL(`${window.location.href}api/appstore`);
    url.searchParams.set('appId', iOSAppId);
    return url.href;
  }

  if (
    (mode === Mode.Both || mode === Mode.Version) &&
    (androidAppId.length > 0 || iOSAppId.length > 0)
  ) {
    let url: URL;

    if (mode === Mode.Both) {
      url = new URL(`${window.location.href}api/all`);
    }

    if (mode === Mode.Version) {
      url = new URL(`${window.location.href}api/version`);
    }

    if (androidAppId.length > 0) {
      url!.searchParams.set('androidAppId', androidAppId);
    }

    if (iOSAppId.length > 0) {
      url!.searchParams.set('iOSAppId', iOSAppId);
    }

    return url!.href;
  }

  return '';
}

export default function URLGenerator() {
  const [mode, setMode] = useState(Mode.Both);
  const [url, setUrl] = useState('');

  const [androidAppId, setAndroidAppId] = useState('');
  const [iOSAppId, setiOSAppId] = useState('');

  useEffect(() => {
    const url = generateURL(mode, androidAppId, iOSAppId);
    setUrl(url);
  }, [mode, androidAppId, iOSAppId]);

  return (
    <div>
      <label htmlFor="mode">Mode:</label>
      <select
        id="mode"
        onChange={(e) => setMode(e.target.value as Mode)}
        value={mode}
      >
        {Object.values(Mode).map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>

      {(mode === Mode.PlayStore ||
        mode === Mode.Both ||
        mode === Mode.Version) && (
        <>
          <label htmlFor="androidAppId">Android App ID:</label>

          <input
            type="text"
            id="androidAppId"
            placeholder="Android app identifier"
            value={androidAppId}
            onChange={(e) => setAndroidAppId(e.target.value)}
          />
        </>
      )}

      {(mode === Mode.AppStore ||
        mode === Mode.Both ||
        mode === Mode.Version) && (
        <>
          <label htmlFor="iOSAppId">iOS App ID:</label>

          <input
            type="text"
            placeholder="iOS app identifier"
            value={iOSAppId}
            onChange={(e) => setiOSAppId(e.target.value)}
          />
        </>
      )}

      {url.length > 0 && (
        <pre>
          <code>{url}</code>
        </pre>
      )}
    </div>
  );
}
