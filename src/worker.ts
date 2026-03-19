import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'cnpj-monitor',
  });

  console.log('Worker iniciado, aguardando tarefas...');

  await worker.run();
}

run().catch((err) => {
  console.error('Worker falhou ao iniciar:', err);
  process.exit(1);
});
