import type { CnpjData } from '../types';
import { ApplicationFailure, log } from '@temporalio/activity';

export async function fetchCnpjActivity(cnpj: string): Promise<CnpjData> {
  log.info('Buscando CNPJ', { cnpj });

  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
    headers: { 'User-Agent': 'cnpj-monitor/1.0' },
  });

  if (response.status === 404) {
    throw ApplicationFailure.nonRetryable(
      `CNPJ ${cnpj} não encontrado`,
      'CnpjNotFound',
    );
  }

  if (!response.ok) {
    throw new Error(
      `BrasilAPI retornou ${response.status} para o CNPJ ${cnpj}`,
    );
  }

  const data = (await response.json()) as CnpjData;

  log.info('CNPJ encontrado', { cnpj, razaoSocial: data.razao_social });

  return data;
}
