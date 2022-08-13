import type { ExpoConfig } from '@expo/config';
import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ({ config }: any): ExpoConfig => {
  const configAugmented = {
    ...config,
  };
  return configAugmented;
};
