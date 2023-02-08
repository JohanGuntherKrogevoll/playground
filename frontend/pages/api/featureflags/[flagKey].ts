// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppConfigurationClient } from '@azure/app-configuration';

const client = new AppConfigurationClient(process.env.NEXT_PUBLIC_CONNECTION_STRING!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean>
) {
  const { query } = req
  const { flagKey } = query
  let enabled = false;
  try {
    console.log(req);

    const configurationSetting = await client.getConfigurationSetting({
      key: `.appconfig.featureflag/${flagKey!.toString().trim()}`,
    });
    if (configurationSetting && typeof configurationSetting === 'object') {
      console.debug('Feature: ' + configurationSetting.key, configurationSetting.value);
      enabled = JSON.parse(configurationSetting.value || '').enabled || false;
    }
  } catch (error) {
    console.error(error);
  }
  res.status(200).json(enabled)
}
