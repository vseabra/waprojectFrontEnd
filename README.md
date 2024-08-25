# TreeCreator

Esse projeto contém uma aplicação de criação de árvores(estrutura de dados). As árvores podem ser exportadas e importadas de arquivos JSON

## Ambiente

O projeto pode ser acessado pelo link [waproject-tree-creator.surge.sh](https://waproject-tree-creator.surge.sh/) (ou rodado localmente)

## Docker

O projeto pode ser servido buildando a imagem docker 

* `docker build -t treecreator .`
* `docker run -p 8080:80 treecreator`
* acessar `http://localhost:8080` no browser

## Scripts

### `npm start`

Roda o app em modo de desenvolvimento
abra [http://localhost:3000](http://localhost:3000) no seu Browser

### `npm run build`

Gera um build para produção do projeto

## Dependências

Esse projeto usa 2 componentes da biblioteca shadcnUI: [Button](https://ui.shadcn.com/docs/components/button) e [Collapsible](https://ui.shadcn.com/docs/components/collapsible). e Tailwind css

