# Dra. Karen Xavier

Landing page da Dra. Karen Xavier, cirurgiã-dentista com foco em harmonização facial em Brasília, com uma seção sobre o Le Signature, espaço onde ela atende.

Next.js 16, React 19, Tailwind CSS 4 e TypeScript. Página única e estática.

## Rodar no computador

```bash
npm install
npm run dev
```

O site abre em http://localhost:3000. Para testar a versão final: `npm run build` e depois `npm start`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Textos, contatos, procedimentos, dúvidas e casos de antes e depois | `src/lib/site.ts` |
| Layout das seções | `src/app/page.tsx` |
| Cores e fontes | `src/app/globals.css` |
| Fotos | `public/images/` |
| Imagem de compartilhamento | `src/app/opengraph-image.jpg` (1200×630) |

## Fotos de antes e depois

As fotos das pacientes não ficam neste repositório. São dados de saúde e só podem ser publicadas com autorização por escrito de cada paciente (LGPD e Resolução CFO 196/2019). Para rodar o site com elas, coloque os arquivos em `public/images/resultados/` com os nomes usados em `src/lib/site.ts`.

Para adicionar um caso:

1. Separe o antes e o depois em dois arquivos do mesmo tamanho, com o mesmo enquadramento e a mesma luz. Se a foto vier montada, corte sem redimensionar.
2. Fotos muito verticais ficam melhores recortadas em 4:5, na mesma área nas duas fotos.
3. Adicione o caso na lista `results` em `src/lib/site.ts`, com a largura e a altura da foto em `width` e `height`.

## Publicar

O site é exportado como arquivos estáticos (`out/`) e hospedado no Cloudflare Pages. Antes de cada build, `scripts/optimize-images.mjs` gera versões WebP das fotos em `public/_img/`.

```bash
npm run deploy
```

Na primeira vez, o Wrangler abre o navegador para entrar na conta da Cloudflare.
