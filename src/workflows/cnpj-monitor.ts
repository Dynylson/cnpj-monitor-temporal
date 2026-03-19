interface CnpjMonitorProps {
  cnpjs: string[];
}

export async function cnpjMonitor({ cnpjs }: CnpjMonitorProps) {
  console.log('Cnpjs vindos: ', cnpjs);
}
