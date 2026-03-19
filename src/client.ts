import { Client, Connection } from '@temporalio/client';
import { cnpjMonitor } from './workflows';

const CNPJS = ['11222333000181', '34238864000168', '45997418000153'];

async function startOnboarding() {
  const connection = await Connection.connect({
    address: 'localhost:7233',
  });

  const client = new Client({ connection });

  const handles = await Promise.all(
    CNPJS.map((cnpj) =>
      client.workflow.start(cnpjMonitor, {
        taskQueue: 'cnpj-monitor',
        workflowId: `cnpj-monitor-${cnpj}`,
        args: [{ cnpj }],
      }),
    ),
  );

  const results = await Promise.all(handles.map((h) => h.result()));

  results.forEach((result) => {
    console.log(`[${result.cnpj}] ${result.razao_social}`);
  });

  await connection.close();
}

startOnboarding().catch(console.error);
