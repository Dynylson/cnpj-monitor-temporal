export interface CnpjData {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: number;
  descricao_situacao_cadastral: string;
  data_situacao_cadastral: string;
  natureza_juridica: string;
  descricao_natureza_juridica: string;
  capital_social: number;
  porte: string;
  descricao_porte: string;
}

export interface CnpjMonitorProps {
  cnpj: string;
}

export interface CheckStatusResult {
  hasChanges: boolean;
  changedFields: string[];
}
