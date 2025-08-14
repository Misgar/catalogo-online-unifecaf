# Catálogo Interativo Mobile (Expo + Expo Router + Axios)

Fluxo: **Login** → **Abas (Masculino/Feminino)** → **Detalhes** → **Logout**.

## Requisitos atendidos
- Login com validação simples e estado temporário (`useState`), sem Redux.
- Listagem por abas consumindo API DummyJSON via Axios.
- Tela de detalhes por ID (`/produto/[id]`).
- Logout no header das abas que volta ao login.
- Estrutura organizada (pastas em inglês, arquivos de código em português).

## Rodar o projeto
```bash
npm install
npx expo start
```
> Caso falte o Expo Router no ambiente, rode: `npm i expo-router`

## Endpoints usados (DummyJSON)
- Listas por categoria: `https://dummyjson.com/products/category/{categoria}`  
  - Masculino: `mens-shirts`, `mens-shoes`, `mens-watches`  
  - Feminino: `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`
- Detalhe por ID: `https://dummyjson.com/products/{id}`

## Estrutura
- `app/_layout.tsx`: Provider de autenticação + guarda de rotas + Stack
- `app/(autenticacao)/login.tsx`: tela de login
- `app/(abas)/_layout.tsx`: abas + botão de Logout
- `app/(abas)/masculino.tsx` e `feminino.tsx`: listas
- `app/produto/[id].tsx`: detalhes do produto
- `src/components/CartaoProduto.tsx`: card do item
- `src/hooks/useProdutos.ts`: hook de busca/merge/cache simples
- `src/services/api.ts`: Axios
- `src/types/produto.ts`: tipos

## Boas práticas usadas
- Separação de camadas (componentes/serviços/hooks/types).
- Estados de carregamento/erro.
- Rotas agrupadas com pastas "parênteses" no Expo Router.

Veja também `roteiro_video.md` e `texto_reflexivo.md`.
