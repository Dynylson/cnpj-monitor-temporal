import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';
import { CnpjMonitorProps } from '../types';

const { fetchCnpjActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
  retry: {
    maximumAttempts: 3,
  },
});

export async function cnpjMonitor({ cnpj }: CnpjMonitorProps) {
  return fetchCnpjActivity(cnpj);
}
