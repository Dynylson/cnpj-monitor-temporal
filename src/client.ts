import { Client, Connection } from '@temporalio/client';
import { cnpjMonitor } from './workflows';
import { randomUUID } from 'node:crypto';

async function startOnboarding() {
  const connection = await Connection.connect({
    address: 'localhost:7233',
  });

  const client = new Client({ connection });

  const handle = await client.workflow.start(cnpjMonitor, {
    taskQueue: 'cnpj-monitor',
    workflowId: `cnpj-${randomUUID()}`,
    args: [{ cnpjs: ['86786973138', '81455442191', '49926061792'] }],
  });

  console.log(`Workflow iniciado! ID: ${handle.workflowId}`);

  const result = await handle.result();

  console.log('Resultado:', result);

  await connection.close();
}

startOnboarding().catch(console.error);
