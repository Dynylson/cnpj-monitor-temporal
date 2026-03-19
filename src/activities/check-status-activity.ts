import { log } from '@temporalio/activity';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { CnpjData, CheckStatusResult } from '../types';

const SNAPSHOTS_DIR = join(process.cwd(), 'snapshots');

const MONITORED_FIELDS: (keyof CnpjData)[] = [
  'situacao_cadastral',
  'descricao_situacao_cadastral',
  'razao_social',
  'nome_fantasia',
  'capital_social',
  'porte',
];

async function readSnapshot(cnpj: string): Promise<CnpjData | null> {
  try {
    const content = await readFile(join(SNAPSHOTS_DIR, `${cnpj}.json`), 'utf-8');
    return JSON.parse(content) as CnpjData;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

async function writeSnapshot(data: CnpjData): Promise<void> {
  await mkdir(SNAPSHOTS_DIR, { recursive: true });
  await writeFile(join(SNAPSHOTS_DIR, `${data.cnpj}.json`), JSON.stringify(data, null, 2));
}

export async function checkStatusActivity(current: CnpjData): Promise<CheckStatusResult> {
  const previous = await readSnapshot(current.cnpj);

  if (!previous) {
    log.info('Primeiro snapshot registrado', { cnpj: current.cnpj });
    await writeSnapshot(current);
    return { hasChanges: false, changedFields: [] };
  }

  const changedFields = MONITORED_FIELDS.filter(
    (field) => previous[field] !== current[field],
  );

  if (changedFields.length > 0) {
    log.info('Alterações detectadas', { cnpj: current.cnpj, changedFields });
    await writeSnapshot(current);
  } else {
    log.info('Sem alterações', { cnpj: current.cnpj });
  }

  return { hasChanges: changedFields.length > 0, changedFields };
}
