# Fases do Projeto Temporal

## Fase 1 — Infraestrutura (RF-01)

- [ ] Criar o `docker-compose.yml` com Temporal Server, PostgreSQL e UI
- [ ] Rodar `docker compose up` e acessar http://localhost:8080
- [ ] Validar que o Temporal UI está respondendo

**Checkpoint:** Temporal UI acessível e sem erros no terminal.

---

## Fase 2 — Hello World Temporal (RF-03, RF-04, RF-05)

- [ ] Instalar `@temporalio/client`, `@temporalio/worker`, `@temporalio/activity`
- [ ] Criar um workflow mínimo que apenas loga o array de CNPJs recebido
- [ ] Criar o `worker.ts` e o `client.ts` sem CRON ainda (execução manual)
- [ ] Rodar e visualizar a execução no Temporal UI

**Checkpoint:** Execução aparece no UI com status **Completed**.

---

## Fase 3 — Activities (RF-08, RF-09)

- [ ] Implementar `FetchCNPJActivity` com chamada real à BrasilAPI
- [ ] Configurar `startToCloseTimeout` e `maximumAttempts` na `RetryPolicy`
- [ ] Testar com CNPJ válido e inválido para ver retry em ação

**Checkpoint:** Ver retries acontecendo no histórico de events do Temporal UI.

---

## Fase 4 — Snapshot e Diff (RF-10, RF-11, RF-12)

- [ ] Implementar `CheckStatusActivity` com leitura/escrita de JSON local
- [ ] Implementar lógica de diff nos campos monitorados
- [ ] Adicionar condição no workflow: só chama `NotifyActivity` se houve diff

**Checkpoint:** Ao rodar duas vezes com mesmo CNPJ, segunda execução não notifica.

---

## Fase 5 — Notificação (RF-13)

- [ ] Implementar `NotifyActivity` com Nodemailer ou webhook
- [ ] Testar alterando manualmente o snapshot para simular uma mudança

**Checkpoint:** Receber notificação ao detectar diff.

---

## Fase 6 — CRON (RF-06)

- [ ] Adicionar `cronSchedule` no `client.ts`
- [ ] Observar execuções periódicas no Temporal UI
- [ ] Testar o que acontece se o worker for derrubado durante uma execução

**Checkpoint:** Execuções aparecem automaticamente no UI sem intervenção manual.
