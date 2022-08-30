import { useEffect, useState } from 'react';

enum Mode {
  PlayStore = 'Google Play Store',
  AppStore = 'Apple App Store',
  Both = 'Both',
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

  if (mode === Mode.Both && androidAppId.length > 0 && iOSAppId.length > 0) {
    const url = new URL(`${window.location.href}api/all`);
    url.searchParams.set('androidAppId', androidAppId);
    url.searchParams.set('iOSAppId', iOSAppId);
    return url.href;
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

      {(mode === Mode.PlayStore || mode === Mode.Both) && (
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

      {(mode === Mode.AppStore || mode === Mode.Both) && (
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
