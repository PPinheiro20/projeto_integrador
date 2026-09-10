# 🎮 Minha Coleção de Jogos

Aplicativo desenvolvido em **React Native** para criar e gerenciar uma coleção pessoal de jogos.

O sistema permite cadastrar jogos, alterar o status de cada um, registrar horas jogadas, adicionar comentários, editar nomes e excluir jogos. Os dados são armazenados localmente no dispositivo utilizando o **AsyncStorage**.

---

## 📱 Sobre o projeto

O projeto possui uma tela principal chamada `ColecaoScreen` e um componente chamado `ColecaoItem`.

A `ColecaoScreen` é responsável pelo gerenciamento dos dados da coleção, incluindo:

* Adicionar jogos;
* Editar jogos;
* Excluir jogos;
* Alterar o status;
* Alterar as horas jogadas;
* Alterar comentários;
* Salvar os dados no armazenamento local;
* Carregar os dados quando o aplicativo é aberto.

## O `ColecaoItem` é responsável pela exibição individual de cada jogo e pelos controles de interação do usuário.

## 🛠️ Tecnologias utilizadas

* **React Native**
* **JavaScript**
* **React Hooks**

  * `useState`
  * `useEffect`
* **AsyncStorage**
* `FlatList`
* `TextInput`
* `TouchableOpacity`
* `StyleSheet`

---

## 📂 Estrutura dos arquivos

```text
projeto_integrador/
└── somativa_mobile/
    ├── .claude/
    ├── .expo/
    ├── assets/
    ├── node_modules/
    │
    ├── src/
    │   ├── components/
    │   │   └── ColecaoItem.js
    │   │
    │   └── screens/
    │       └── ColecaoScreen.js
    │
    ├── .gitignore
    ├── AGENTS.md
    ├── App.js
    ├── app.json
    ├── CLAUDE.md
    ├── index.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md
```

### `ColecaoScreen.js`

É a tela principal do sistema.

Ela controla o array de jogos através do estado:

```javascript
const [itens, setItens] = useState([]);
```

Também controla o texto digitado, o carregamento dos dados e o jogo que está sendo editado.

---

### `ColecaoItem.js`

É o componente responsável por apresentar cada jogo cadastrado.

Ele recebe o jogo e as funções necessárias através das propriedades:

```javascript
item
aoAlternarStatus
aoExcluir
aoEditar
aoAlterarHoras
aoAlterarComentario
```

Dessa forma, o componente consegue executar ações que são controladas pela `ColecaoScreen`.

---

# 🎯 Funcionalidades

## ➕ Adicionar jogos

O usuário pode digitar o nome de um jogo no campo de texto e clicar em **Adicionar**.

Quando um novo jogo é criado, ele recebe:

```javascript
{
    id: Date.now().toString(),
    titulo: titulo,
    status: "quero_jogar",
    horas: "0",
    comentario: ""
}
```

Assim, todo novo jogo começa com o status **"Quero jogar"**, zero horas e nenhum comentário.

---

## 🔄 Alterar status

Cada jogo possui um botão de status.

Os três status disponíveis são:

1. **Quero jogar**
2. **Jogando**
3. **Concluído**

A ordem utilizada pelo sistema é:

```text
Quero jogar
      ↓
   Jogando
      ↓
  Concluído
      ↓
Quero jogar
```

Essa ordem é definida pelo array `ORDEM_STATUS`.

---

## ⏱️ Registrar horas jogadas

Quando o jogo está nos status **Jogando** ou **Concluído**, aparece um campo para informar a quantidade de horas jogadas.

O campo utiliza teclado numérico:

```javascript
keyboardType="numeric"
```

As horas são atualizadas através da função `aoAlterarHoras`.

---

## 📝 Adicionar comentários

Também é possível adicionar comentários ou anotações sobre o jogo.

O campo permite várias linhas através da propriedade:

```javascript
multiline
```

Os comentários também aparecem somente quando o jogo está como **Jogando** ou **Concluído**.

---

## ✏️ Editar jogos

O botão **Editar** coloca o jogo selecionado em modo de edição.

O nome atual do jogo é colocado novamente no `TextInput`, permitindo que o usuário altere o título.

Depois, o botão muda de **Adicionar** para **Salvar**.

---

## 🗑️ Excluir jogos

O botão **Excluir** remove o jogo selecionado da coleção.

A função utiliza `filter()` para criar uma nova lista sem o item escolhido.

---

## 🧹 Limpar coleção

Existe também o botão:

**"Limpar toda a coleção"**

Ele remove todos os jogos do estado:

```javascript
setItens([]);
```

---

## 📦 Escolha da Persistência de Dados

Para armazenar os dados da coleção de jogos, foi escolhido o **AsyncStorage**.

A escolha foi feita levando em consideração o volume e a complexidade dos dados
utilizados no projeto. Cada jogo possui informações simples, como:

- Título;
- Status;
- Horas jogadas;
- Comentários/anotações.

O projeto trabalha com uma quantidade pequena de informações e não possui
relacionamentos complexos entre diferentes tipos de dados. Por esse motivo,
o AsyncStorage é suficiente para atender às necessidades da aplicação.

O **SQLite** seria mais indicado para projetos que trabalhassem com uma grande
quantidade de registros, relacionamentos entre diferentes dados, consultas
mais complexas ou uma estrutura de banco de dados relacional.

Dessa forma, o **AsyncStorage** foi escolhido por ser adequado ao volume e à
complexidade dos dados da coleção de jogos, além de permitir que as
informações permaneçam salvas mesmo após o fechamento do aplicativo.

A chave utilizada é:

```javascript
const CHAVE_STORAGE = "@colecao_jogos";
```

Quando a tela é aberta, o aplicativo procura os dados armazenados e transforma o texto salvo novamente em um array utilizando `JSON.parse()`.

Quando a lista é modificada, os dados são convertidos para texto com `JSON.stringify()` e armazenados novamente:

```javascript
AsyncStorage.setItem(
    CHAVE_STORAGE,
    JSON.stringify(itens)
);
```

---

# 📋 Exibição da lista

Os jogos são apresentados utilizando o componente `FlatList`.

```javascript
<FlatList
    data={itens}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <ColecaoItem ... />
    )}
/>
```

O `FlatList` recebe o array `itens` e cria um `ColecaoItem` para cada jogo cadastrado.

Quando não existem jogos cadastrados, aparece a mensagem:

```text
Nenhum jogo cadastrado ainda.
```

---

# 🎨 Interface

A interface utiliza um tema escuro, com elementos em tons de roxo.

Cada jogo é apresentado dentro de um card contendo:

* Nome do jogo;
* Campo de horas, quando disponível;
* Campo de comentários, quando disponível;
* Status;
* Botão Editar;
* Botão Excluir.

O status possui cores diferentes para facilitar sua identificação:

| Status      | Cor     |
| ----------- | ------- |
| Quero jogar | Amarelo |
| Jogando     | Azul    |
| Concluído   | Verde   |

Essas cores são definidas no objeto `CORES_STATUS` do `ColecaoItem`.

---

# 🔄 Fluxo do aplicativo

O funcionamento básico pode ser representado assim:

```text
              ABRIR APLICATIVO
                     │
                     ▼
             Carregar AsyncStorage
                     │
                     ▼
              Mostrar coleção
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Adicionar   Editar    Excluir
          │          │          │
          └──────────┼──────────┘
                     ▼
                Atualizar
                  estado
                     │
                     ▼
              Salvar AsyncStorage
```

---

# 🧩 Comunicação entre componentes

A `ColecaoScreen` é responsável pelos dados e funções.

O `ColecaoItem` recebe essas informações através de **props**.

Por exemplo:

```javascript
<ColecaoItem
    item={item}
    aoAlternarStatus={alternarStatus}
    aoExcluir={excluirItem}
    aoEditar={iniciarEdicao}
    aoAlterarHoras={alterarHoras}
    aoAlterarComentario={alterarComentario}
/>
```

Isso permite separar as responsabilidades:

```text
ColecaoScreen
     │
     │ Dados + funções
     ▼
ColecaoItem
     │
     │ Interação do usuário
     ▼
ColecaoScreen
     │
     ▼
Atualiza os dados
```

---

# 📚 Conceitos utilizados

O projeto trabalha com vários conceitos importantes do React Native:

### `useState`

Utilizado para controlar informações que podem mudar durante o uso do aplicativo.

Exemplos:

```javascript
const [itens, setItens] = useState([]);
const [textoInput, setTextoInput] = useState("");
```

### `useEffect`

Utilizado para executar ações quando a tela é carregada ou quando determinados estados são alterados.

Neste projeto, é utilizado principalmente para carregar e salvar os dados do AsyncStorage.

### Props

Utilizadas para passar dados e funções da `ColecaoScreen` para o `ColecaoItem`.

### `FlatList`

Utilizado para apresentar vários jogos de maneira otimizada.

### AsyncStorage

Utilizado para armazenamento local dos jogos.

### Renderização condicional

Utilizada para mostrar horas e comentários somente quando o status é:

```text
Jogando
```

ou

```text
Concluído
```

Essa regra é definida pela variável `permitirDetalhes`.

---

# 👨‍💻 Objetivo do projeto

O objetivo do projeto é desenvolver uma aplicação mobile simples para gerenciamento de uma coleção pessoal de jogos, permitindo que o usuário acompanhe quais jogos deseja jogar, quais está jogando e quais já terminou.

Além disso, o sistema permite registrar informações adicionais, como **horas jogadas e comentários**, mantendo os dados armazenados localmente no dispositivo.

---

# ✅ Conclusão

O projeto demonstra a utilização de **React Native**, gerenciamento de estados, componentes reutilizáveis, comunicação através de props, listas com `FlatList` e persistência de dados com `AsyncStorage`.

A separação entre `ColecaoScreen` e `ColecaoItem` também ajuda a organizar o código, deixando a tela principal responsável pelo gerenciamento dos dados e o componente de item responsável pela apresentação e interação de cada jogo.

# INTEGRANTES #
github.com/adrian-clarck
github.com/PPinheiro20
