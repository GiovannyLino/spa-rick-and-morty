# SPA Rick & Morty

Este projeto é uma Single-Page Application (SPA) desenvolvida em Angular 20, consumindo a [API REST do Rick & Morty](https://rickandmortyapi.com/). A aplicação foi criada como parte de um teste técnico, seguindo um layout proposto no Figma e implementando diversas funcionalidades modernas de frontend.

---

## 🎨 Layout

O design da aplicação foi baseado no protótipo disponibilizado no Figma.

* **[Link para o Figma](https://www.figma.com/design/ZpPA9efuVfldOnSPvwVjGb/L5-Networks---Teste-Frontend?node-id=0-1)**

---

## 🚀 Funcionalidades Implementadas

* **Dashboard Dinâmico:** Página inicial com um carrossel de personagens em destaque.
* **Listagem de Personagens e Episódios:** Páginas dedicadas para listar personagens e episódios da API.
* **Paginação com Scroll Infinito:** Carregamento de mais itens conforme o usuário rola a página.
* **Páginas de Detalhes:** Visualização detalhada de cada personagem ou episódio, com informações e entidades relacionadas.
* **Busca Global:** Barra de pesquisa persistente no cabeçalho que busca em múltiplas categorias e exibe os resultados em uma página dedicada.
* **Histórico de Busca:** O sistema salva e exibe as últimas buscas do usuário.
* **Sistema de Login (Mock):** Página de login que protege o acesso ao conteúdo da aplicação. O estado de login persiste entre sessões.
* **Página de Perfil Editável:** Uma página de perfil onde o usuário pode editar suas informações (nome, sobre, formação, experiência) e foto. Os dados são salvos localmente no navegador (`localStorage`).
* **Roteamento e Navegação:** Sistema completo de rotas com "Route Guard" para proteger as páginas privadas.
* **Layout Responsivo:** A aplicação se adapta a diferentes tamanhos de tela.

---

## 🛠️ Tecnologias Utilizadas

* **[Angular 20](https://angular.io/)**: Framework principal para a construção da SPA.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[RxJS](https://rxjs.dev/)**: Para programação reativa e gerenciamento de chamadas assíncronas.
* **[Swiper.js](https://swiperjs.com/)**: Biblioteca moderna para carrosséis e sliders.
* **[Font Awesome](https://fontawesome.com/)**: Biblioteca de ícones.
* **CSS3**: Para estilização, utilizando Flexbox e Grid Layout.

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [Angular CLI](https://angular.io/cli) (versão 20 ou superior)

```bash
# 1. Clone o repositório
git clone [https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories](https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories)

# 2. Navegue para a pasta do projeto
cd nome-do-projeto

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
ng serve

# 5. Abra seu navegador em http://localhost:4200/
```

**Credenciais de Login (Mock):**
* **Email:** `user@test.com`
* **Senha:** `password123`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
