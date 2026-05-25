# Exemplos de Output

Esta pasta contém **exemplos de artefatos** gerados pelas skills do template. São referências didáticas para você ver "como deveria ficar" antes de rodar as skills no seu próprio projeto.

## Arquivos

| Arquivo | Gerado por | O que é |
|---------|-----------|---------|
| [`00-perfil-projeto.example.md`](00-perfil-projeto.example.md) | `/iniciar-projeto` (fases 1-3) | Briefing inicial estruturado: problema, usuário, solução, sucesso, fora do escopo |
| [`macro-processo.example.md`](macro-processo.example.md) | `/iniciar-projeto` (fase 4) | Macro processo do negócio em Mermaid + descrição das etapas |
| [`analise-estrategica.example.md`](analise-estrategica.example.md) | `/iniciar-projeto` (fase 5) | Análise de riscos + compliance + dependências + top 5 mitigações |

## Como usar

1. **Antes de rodar `/iniciar-projeto`**: leia os exemplos para saber o que esperar.
2. **Durante a sessão**: compare o output sendo gerado com os exemplos. Se faltar profundidade em alguma seção, peça pra IA aprofundar.
3. **Depois da sessão**: compare seu briefing real (`docs/raw/00-perfil-projeto.md`) com o exemplo. Não precisa ficar idêntico, mas a riqueza informacional deve ser similar.

## Sobre o projeto-exemplo

Os exemplos usam o **próprio `cocreate-project-template`** como projeto. Esta é uma escolha didática: o template é real, autoexplicativo, e o aluno pode comparar o briefing/macro-processo com a estrutura atual do template para ver como a metodologia foi aplicada.

## Não confunda

- **Esta pasta**: exemplos de output (referência didática)
- **`docs/raw/`**: material bruto do SEU projeto real (briefings, transcrições)
- **`docs/perguntas/`**: bancos de perguntas que alimentam as skills
- **`docs/macro-processo.md`** (raiz de docs): macro processo REAL do seu projeto (gerado pela skill)
- **`docs/macro-processo.template.md`**: template em branco usado pela skill para gerar o macro processo real

Os arquivos `*.example.md` aqui têm sempre o sufixo `.example` para evitar confusão com os artefatos reais.
