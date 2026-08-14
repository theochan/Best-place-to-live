import { ProviderStatus } from '../../types';

export interface BaseProvider {
  id: string;
  name: string;
  agency: string;
  getStatus(): Promise<ProviderStatus>;
}
