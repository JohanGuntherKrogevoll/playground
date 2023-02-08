import { useMemo, useState } from 'react';
import { json } from 'stream/consumers';


/**
 * Retrieves the specified feature flag from Azure App Configuration.
 * @param {string} flagKey App Config Feature Flag key
 * @returns the feature flag for the specified key
 */
const useFeatureFlag = (flagKey = '') => {
  const [enabled, setEnabled] = useState(false);


  useMemo(async () => {
    if (!flagKey || !flagKey.toString().trim().length) {
      console.error('A feature flag key must be supplied.');
    } else {
      try {
        const res = await fetch(`/api/featureflags/${flagKey}`)
        setEnabled(await res.json())
      } catch (error) {
        console.error(error);
      }
    }
  }, [flagKey]);

  return { enabled };
};

export { useFeatureFlag };