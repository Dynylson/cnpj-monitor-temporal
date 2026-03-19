import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';
import { CnpjMonitorProps } from '../types';

const { fetchCnpjActivity, checkStatusActivity } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '30 seconds',
  retry: {
    maximumAttempts: 3,
  },
});

export async function cnpjMonitor({ cnpj }: CnpjMonitorProps) {
  const data = await fetchCnpjActivity(cnpj);

  const status = await checkStatusActivity(data);

  if (status.hasChanges) {
    // TODO: notificar por e-mail ou webhook
  }

  return { data, status };
}
