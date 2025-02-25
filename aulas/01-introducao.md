<style>
summary {
  padding: 5px;
  border: 1px solid black;
  box-shadow: 3px 3px 2px rgb(74, 74, 74);
  margin: 10px 0;
  list-style: none;
}

</style>

# Métodos Ágeis e Gestão de Equipes

## 1. Manifesto Ágil: O que é e por que é importante?
- O **Manifesto Ágil** surgiu em 2001 para propor uma abordagem flexível e colaborativa no desenvolvimento de software.
- Os **4 valores fundamentais**:
  1. `Indivíduos e interações` mais que processos e ferramentas.
  2. `Software funcionando` mais que documentação abrangente.
  3. `Colaboração com o cliente` mais que negociação de contratos.
  4. `Responder a mudanças` mais que seguir um plano.
- Os **12 princípios do Manifesto Ágil**, com foco na entrega contínua e adaptação.

🔗 [Manifesto Ágil](https://agilemanifesto.org/iso/ptbr/manifesto.html)

## 2. Processos e Rotinas do Scrum
O Scrum é um framework para gerenciar projetos de software de forma ágil.
- **Papéis do Scrum:**
  - `Scrum Master` – Facilita o processo, ajuda a remover impedimentos.
  - `Product Owner` – Representa os interesses do cliente e prioriza o backlog.
  - `Time de Desenvolvimento` – Responsável pela entrega do produto.
- **Artefatos do Scrum:**
  - `Product Backlog` – Lista de todas as funcionalidades desejadas.
  - `Sprint Backlog` – Seleção de itens a serem feitos na Sprint.
  - `Incremento` – O que foi entregue ao final de cada Sprint.
- **Eventos do Scrum:**
  - `Sprint Planning` – Planejamento da Sprint.
  - `Daily Scrum` – Reunião diária curta.
  - `Sprint Review` – Demonstração do que foi feito.
  - `Retrospectiva` – Avaliação do que pode ser melhorado.

## 3. Processos e Rotinas do Kanban
O **Kanban** é um método visual para gerenciar fluxo de trabalho.
- **Princípios:**
  - Visualizar o fluxo de trabalho.
  - Limitar o trabalho em progresso (WIP).
  - Gerenciar o fluxo.
  - Melhorar continuamente.
- **Quadro Kanban:**
  - Colunas: `Backlog`, `A Fazer (To Do)`, `Em Andamento (In Progress)`, `Em Revisão (Code Review)` e `Concluído (Done)`.
  - Cartões: Representam tarefas.
  - Regras para limitar a quantidade de trabalho em progresso.

Exemplo:

| **Backlog** (Ideias/Pendências) | **A Fazer** (To Do) | **Em Andamento** (In Progress) | **Em Revisão** (Code Review) | **Concluído** (Done) |
|---------------------|---------------------|---------------------|---------------------|---------------------|
| Pesquisar APIs para validação de identidade | Criar tela de login e cadastro | Implementar API de autenticação | Revisar código da tela inicial | Criar repositório no GitHub |
| Implementar reconhecimento facial para login | Definir identidade visual do app | Desenvolver funcionalidade de transferências via Pix | Testar integração da API de saldo com frontend | Criar documentação inicial do projeto |
| Criar funcionalidade de saque sem cartão | Criar banco de dados para usuários | Implementar notificação de transações | Revisar testes unitários da funcionalidade de Pix | Definir arquitetura do backend |
| Desenvolver suporte para múltiplos idiomas | Planejar onboarding de novos usuários | Criar dashboard para exibição de saldo | Revisar segurança da API | Configurar ambiente de desenvolvimento |

## 4. Colaboração e Integração em Equipes Ágeis
Trabalho em equipe é essencial no desenvolvimento de software.
- Conceitos-chave:
  - **Comunicação eficiente** (reuniões curtas, feedback contínuo).
  - **Cultura de colaboração** (todos têm voz e participam das decisões).
  - **Integração Contínua** (código atualizado e revisado frequentemente).

# 5. Comparação entre Scrum e Kanban
| **Critério**          | **Scrum**             | **Kanban**          |
| --------------------- | --------------------- | ------------------- |
| **Planejamento**      | Sprints fixas         | Fluxo contínuo      |
| **Papéis definidos?** | Sim                   | Não necessariamente |
| **Eventos**           | Reuniões estruturadas | Sem reuniões fixas  |
| **Flexibilidade**     | Médio                 | Alto                |

- **Pergunta reflexiva:** "Quando você usaria Scrum e quando usaria Kanban?"

## 🛠️ Ferramentas recomendadas para práticas de gestão de equipes ágeis
  - [Trello](https://trello.com/pt-BR)
  - [Jira](https://www.atlassian.com/br/software/jira)
  - [GitHub](https://github.com/)

## Exemplo prático
  - Imagine que você está desenvolvendo um aplicativo para uma empresa. Como você aplicaria os valores do Manifesto Ágil nesse projeto?
  - Como seria a aplicação destes conceitos no enredo de um **app bancário**?

<details>
<summary><strong>💰 EXEMPLO: App Bancário aplicando Manifesto Ágil</strong></summary>

>💡 Uma fintech quer lançar um **aplicativo bancário** focado em pagamentos instantâneos e gerenciamento de contas. O time de desenvolvimento decide seguir os princípios do **Manifesto Ágil** para garantir flexibilidade e entrega contínua de valor ao cliente.

---

### Aplicação dos 4 Valores do Manifesto Ágil

#### 1. Indivíduos e interações mais que processos e ferramentas
- Em vez de um processo burocrático para comunicação entre equipes, o time adota **reuniões diárias curtas (Daily Scrum)** e mantém um canal direto no Slack para resolver dúvidas rapidamente.
- Durante o desenvolvimento da funcionalidade de **pagamento por QR Code**, os designers, desenvolvedores e especialistas em segurança trabalham juntos em tempo real, trocando feedbacks rapidamente.
- O **Product Owner** conversa frequentemente com clientes beta para entender suas necessidades, ao invés de confiar apenas em longos documentos de requisitos.

>Se um cliente piloto sugere que o app tenha uma opção de pagamento recorrente para contas de luz e internet, a equipe rapidamente discute e adiciona essa melhoria no backlog, sem esperar um longo ciclo de aprovação.

---

#### 2. Software funcionando mais que documentação abrangente
- Em vez de criar um **documento técnico de 50 páginas antes de qualquer implementação**, a equipe opta por entregar **pequenos incrementos do app** a cada Sprint.
- O time lança uma **versão inicial (MVP)** apenas com **cadastro, consulta de saldo e transferências** e, com base no feedback dos usuários, aprimora a experiência.
- A documentação existe, mas é enxuta e focada no essencial (como APIs e padrões de segurança).

>O time desenvolve primeiro a funcionalidade de **pagamento por Pix** e a entrega rapidamente para testes. A documentação técnica é mínima, mas suficiente para que novos desenvolvedores entendam o código e os endpoints da API.

---

#### 3. Colaboração com o cliente mais que negociação de contratos
- Em vez de definir todas as funcionalidades do app logo no início e seguir rigidamente um contrato fechado, a equipe mantém contato **contínuo com usuários reais** para adaptar o produto às suas necessidades.
- Um **grupo de clientes beta** testa cada nova funcionalidade e dá feedback antes do lançamento para o público geral.
- Se um banco parceiro solicita **suporte para cartões de crédito virtuais**, a equipe avalia e ajusta o roadmap, priorizando funcionalidades com maior impacto.

>Após o primeiro teste, os usuários relatam que gostariam de **agendar pagamentos futuros**. A equipe ajusta rapidamente o backlog para incluir essa funcionalidade, pois percebe que ela trará grande valor ao cliente.

---

#### 4. Responder a mudanças mais que seguir um plano
- No início do projeto, o objetivo era apenas **transferências bancárias e pagamentos via QR Code**. No entanto, o **Banco Central anuncia novas regras para Open Banking**.
- Em vez de ignorar essa mudança e seguir o plano inicial, a equipe se adapta rapidamente e decide integrar o Open Banking ao app para oferecer uma experiência melhor.
- As prioridades são ajustadas a cada Sprint para garantir que o produto esteja alinhado com as demandas do mercado e dos clientes.

>A fintech planejava lançar um **cartão pré-pago digital** após seis meses, mas percebe que muitos usuários prefeririam primeiro uma integração com **gestão de boletos e fatura digital**. O time ajusta o backlog para priorizar o que realmente importa para os clientes.

---

### Conclusão
Esse exemplo mostra como um **app bancário** pode ser desenvolvido seguindo os valores do **Manifesto Ágil**, garantindo flexibilidade, adaptação às mudanças e entrega contínua de valor ao cliente. Ao focar em interação, software funcional, colaboração e adaptação, o produto final atende melhor às necessidades reais do usuário.

</details>