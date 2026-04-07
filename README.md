# Front-End - Grade UFLA
Interface web do projeto Grade UFLA. Para contexto geral do sistema, consulte o [repositório principal](https://github.com/GradeUFLA).

## Arquitetura do projeto
A estrutura principal do projeto é organizada da seguinte forma:

```bash
src/
├── assets/     # imagens, ícones e outros recursos estáticos
├── components/ # componentes reutilizáveis
├── context/    # React Contexts
├── hooks/      # hooks personalizados
├── pages/      # telas principais do projeto
├── services/   # serviços de comunicação com APIs (axios)
├── styles/     # estilos globais (index.scss, variables.scss)
└── utils/      # funções utilitárias
```

## Como rodar o projeto 

1. Clonar o repositório:
```bash
git clone https://github.com/GradeUFLA/front.git
cd front
```

2. Instalar dependências:
```bash
npm install
```

3. Rodar o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse a aplicação no navegador: http://localhost:5174

> O número da porta pode variar conforme configuração do Vite.

## Dependências principais

- **React** – Biblioteca principal de UI
- **TypeScript** – Tipagem estática
- **Vite** – Bundler e servidor de desenvolvimento
- **Sass** – Para estilos SCSS e SCSS Modules
- **Axios** – Comunicação com a API

### Estrutura de SCSS
- `styles/index.scss` – reset global e import de variáveis
- `styles/variables.scss` – cores, fontes e espaçamentos base
- `*.module.scss` – estilos de componentes isolados
