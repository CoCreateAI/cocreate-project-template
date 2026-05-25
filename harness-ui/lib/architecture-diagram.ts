type SkillCategory = "gatilhos" | "sessao" | "trabalho" | "manutencao" | "ops" | "outras";

const SKILL_CATEGORY: Record<string, SkillCategory> = {
  "iniciar-projeto": "gatilhos",
  "processar-contexto": "gatilhos",
  "preparar-missao": "sessao",
  "orquestrar": "sessao",
  "executar-tarefa": "trabalho",
  "refinar-conteudo": "trabalho",
  "diretor-experiencias": "trabalho",
  "analisar-coerencia": "manutencao",
  "atualizar-projeto": "manutencao",
  "licoes-aprendidas": "manutencao",
  "status-agentes": "ops",
  "deploy": "ops",
  "rodar-testes": "ops"
};

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  gatilhos: "Gatilhos do projeto",
  sessao: "Sessão",
  trabalho: "Trabalho técnico",
  manutencao: "Manutenção e qualidade",
  ops: "Read-only e manual",
  outras: "Outras"
};

const CATEGORY_ORDER: SkillCategory[] = ["gatilhos", "sessao", "trabalho", "manutencao", "ops", "outras"];

function nodeId(prefix: string, name: string): string {
  return `${prefix}_${name.replace(/-/g, "_")}`;
}

function skillNode(name: string): string {
  // anota algumas skills com hint útil
  const hints: Record<string, string> = {
    "iniciar-projeto": "/iniciar-projeto<br/>5 fases guiadas",
    "executar-tarefa": "/executar-tarefa<br/>loop até 3 tentativas",
    "orquestrar": "/orquestrar<br/>multi-skill em paralelo"
  };
  const label = hints[name] ?? `/${name}`;
  return `    ${nodeId("skill", name)}["${label}"]`;
}

function agentNode(name: string): string {
  return `  ${nodeId("agent", name)}(("${name}<br/>subagent"))`;
}

/**
 * Diagrama simples do ciclo do método (usado na home).
 * Foco: visão de 5 segundos do fluxo SDD + Harness.
 */
export function buildSimpleMethodDiagram(): string {
  return `flowchart LR
  user(["Você"])
  claude["Claude Code"]

  subgraph onboarding["1 · Onboarding"]
    direction TB
    iniciar["/iniciar-projeto"]
    processar["/processar-contexto"]
  end

  subgraph trabalho["2 · Trabalho"]
    direction TB
    preparar["/preparar-missao"]
    executar["/executar-tarefa"]
  end

  subgraph observabilidade["3 · Observabilidade"]
    direction TB
    traces["traces/"]
    status["/status-agentes"]
  end

  artefatos[("docs/specs<br/>+ código")]

  user --> claude
  claude --> onboarding
  onboarding --> trabalho
  trabalho --> artefatos
  trabalho --> observabilidade
  observabilidade -.->|"feedback"| trabalho

  classDef phase fill:#1F3B57,stroke:#E26A5E,color:#F0F4F8,stroke-width:2px
  classDef artefato fill:#142435,stroke:#A0E7B2,color:#F0F4F8
  class onboarding,trabalho,observabilidade phase
  class artefatos artefato
`;
}

/**
 * Diagrama completo do ecossistema (5 categorias de skills, MCPs, harness layer).
 * Usado em /guia como referência avançada — não na home.
 */
export function buildEcosystemDiagram(skillNames: string[], agentNames: string[]): string {
  const grouped: Record<SkillCategory, string[]> = {
    gatilhos: [],
    sessao: [],
    trabalho: [],
    manutencao: [],
    ops: [],
    outras: []
  };
  for (const name of skillNames) {
    const cat = SKILL_CATEGORY[name] ?? "outras";
    grouped[cat].push(name);
  }

  // Subgraphs de categorias com empilhamento vertical (colunas internas)
  const categorySubgraphs = CATEGORY_ORDER.filter((cat) => grouped[cat].length > 0)
    .map((cat) => {
      const nodes = grouped[cat].map(skillNode).join("\n");
      return `    subgraph cat_${cat}["${CATEGORY_LABEL[cat]}"]
      direction TB
${nodes}
    end`;
    })
    .join("\n");

  const agentNodes = agentNames.map(agentNode).join("\n");

  // Conexões agregadas entre camadas (não por skill individual — evita 19 setas cruzadas)
  const has = (name: string) => skillNames.includes(name);
  const firstId = (names: string[]) =>
    names
      .filter(has)
      .slice(0, 1)
      .map((n) => `skill_${n.replace(/-/g, "_")}`)[0];

  const gatilhoId = firstId(["iniciar-projeto", "processar-contexto"]);
  const trabalhoId = firstId(["executar-tarefa", "refinar-conteudo"]);
  const manutId = firstId(["analisar-coerencia", "licoes-aprendidas"]);

  const interLinks = [
    gatilhoId ? `  ${gatilhoId} --> raw` : "",
    gatilhoId ? `  ${gatilhoId} --> specs` : "",
    trabalhoId ? `  ${trabalhoId} --> src` : "",
    trabalhoId ? `  ${trabalhoId} --> tests` : "",
    manutId ? `  ${manutId} --> pending` : "",
    has("preparar-missao") ? `  skill_preparar_missao --> agent_preparar_missao` : "",
    has("orquestrar") ? `  skill_orquestrar --> agent_orquestrar` : ""
  ]
    .filter(Boolean)
    .join("\n");

  return `flowchart LR
  user(["Você"])

  subgraph cliente["1 · Cliente"]
    direction TB
    claude["Claude Code<br/>principal"]
    ui["CoCreate Studio<br/>:3001"]
  end

  subgraph skillsLayer["2 · Skills"]
    direction TB
${categorySubgraphs}
  end

  subgraph agentsLayer["3 · Subagents"]
    direction TB
${agentNodes}
  end

  subgraph harness["4 · Camada Harness"]
    direction TB
    settings["settings.json"]
    hooks["hooks/"]
    traces["traces/"]
    pending["pending-validations"]
    sessionhint["session-end-hint"]
  end

  subgraph compart["5 · docs/ (compartilhada)"]
    direction TB
    raw["raw/"]
    perguntas["perguntas/"]
    specs["specs/"]
    adrs["adr/"]
    mapa["mapa-projeto"]
  end

  subgraph projeto["6 · Projeto"]
    direction TB
    src["src/"]
    tests["tests/"]
  end

  mcps[["MCP: Context7"]]

  %% Fluxo principal entre camadas (esquerda → direita)
  user --> cliente
  claude ==> skillsLayer
  ui -.-> harness
  skillsLayer --> agentsLayer
  skillsLayer --> compart
  skillsLayer --> harness
  skillsLayer --> projeto
  skillsLayer -.-> mcps

  %% Conexões agregadas (uma por categoria de skill, evita confusão visual)
${interLinks}

  %% Retroalimentação
  hooks --> pending
  hooks --> sessionhint
  pending -.->|"fila"| skillsLayer
  traces -.->|"histórico"| ui

  %% Estilos por camada
  classDef cliente fill:#1F3B57,stroke:#E26A5E,color:#F0F4F8,stroke-width:2px
  classDef skillLayer fill:#142435,stroke:#7c5cff,color:#F0F4F8
  classDef agentLayer fill:#1a1d27,stroke:#a594ff,color:#F0F4F8
  classDef harnessLayer fill:#1a1d27,stroke:#7c5cff,color:#F0F4F8
  classDef sharedLayer fill:#1a1d27,stroke:#5b637a,color:#F0F4F8
  classDef projectLayer fill:#0A1422,stroke:#A0E7B2,color:#F0F4F8
  classDef mcp fill:#0A1422,stroke:#5b3fdb,color:#F0F4F8

  class cliente cliente
  class skillsLayer skillLayer
  class agentsLayer agentLayer
  class harness harnessLayer
  class compart sharedLayer
  class projeto projectLayer
  class mcps mcp
`;
}
