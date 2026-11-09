# Drew Studio — Site demonstrativo

Site de um estúdio criativo fictício. Apresenta serviços, explica o processo de trabalho e permite selecionar um serviço e gerar um briefing em arquivo `.txt`.

O formulário **não envia mensagens**: o visitante baixa o resumo no próprio navegador. Assim, a demonstração pode ser testada sem cadastrar e-mail nem contratar um serviço de formulários.

## Abrir

O arquivo `index.html` na raiz leva à página do projeto. Você também pode abrir diretamente:

`landing-page-tailwind-social-media-main/landing-page-tailwind-social-media-main/index.html`

Para servir localmente, na raiz:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. Não há instalação de dependências para usar o site.

## O que foi desenvolvido

- Layout com versões para celular e computador.
- Navegação para serviços, processo e briefing.
- Seleção do serviço a partir dos cards.
- Formulário com validação e download do resumo.
- Tema claro/escuro com preferência salva quando o navegador permite.
- Foco visível, rótulos de formulário e redução de movimento.
- CSS e JavaScript locais, sem dependência de CDN.

A versão anterior usava componentes Flowbite. A revisão mantém o conceito Drew e as imagens existentes no repositório, com interface e código reestruturados. O projeto não representa um cliente contratado, uma empresa em atividade ou equipe real. As imagens preexistentes precisam ter sua licença conferida antes de um uso comercial.

## Verificação

`npm install` e `npx playwright install chromium` preparam os testes de navegador. Rode `npm test` com o servidor local ativo em `http://localhost:8000`. O fluxo do GitHub Actions executa as verificações e gera capturas em desktop e celular.

O teste confere navegação, tema, download do briefing, carregamento das imagens e largura da página.

## Demonstração para portfólio

Mostre a página no computador, selecione um serviço, gere o briefing e repita a navegação no celular. Apresente como **projeto demonstrativo de site institucional**.

Samir Gedeon · HTML, CSS e JavaScript.
