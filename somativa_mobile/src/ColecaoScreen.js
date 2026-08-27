import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ColecaoItem from "../components/ColecaoItem";

const CHAVE_STORAGE = "@colecao_jogos";

const ORDEM_STATUS = ["quero_jogar", "jogando", "concluido"];

export default function ColecaoScreen() {
  const [itens, setItens] = useState([]);
  const [textoInput, setTextoInput] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState(null);

  // Carrega os jogos salvos no AsyncStorage
  useEffect(() => {
    async function carregarItens() {
      try {
        const itensSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);

        if (itensSalvos !== null) {
          setItens(JSON.parse(itensSalvos));
        }
      } catch (erro) {
        console.error("Erro ao carregar itens:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarItens();
  }, []);

  // Salva os jogos sempre que a lista mudar
  useEffect(() => {
    if (carregando) return;

    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens)).catch((erro) => {
      console.error("Erro ao salvar itens:", erro);
    });
  }, [itens, carregando]);

  // Adiciona um novo jogo
  function adicionarItem() {
    const titulo = textoInput.trim();

    if (titulo === "") return;

    const novoItem = {
      id: Date.now().toString(),
      titulo: titulo,
      status: "quero_jogar",
    };

    setItens((itensAtuais) => [...itensAtuais, novoItem]);

    setTextoInput("");
  }

  // Alterna entre os três status
  function alternarStatus(id) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.id !== id) return item;

        const indiceAtual = ORDEM_STATUS.indexOf(item.status);
        const proximoIndice = (indiceAtual + 1) % ORDEM_STATUS.length;

        return {
          ...item,
          status: ORDEM_STATUS[proximoIndice],
        };
      }),
    );
  }

  // Exclui um jogo
  function excluirItem(id) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  // Inicia a edição de um jogo
  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setTextoInput(item.titulo);
  }

  // Salva a edição
  function salvarEdicao() {
    const titulo = textoInput.trim();

    if (titulo === "" || editandoId === null) return;

    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === editandoId ? { ...item, titulo: titulo } : item,
      ),
    );

    setTextoInput("");
    setEditandoId(null);
  }

  // Limpa toda a coleção
  function limparItens() {
    setItens([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Coleção</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome do jogo..."
          value={textoInput}
          onChangeText={setTextoInput}
          onSubmitEditing={editandoId === null ? adicionarItem : salvarEdicao}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={editandoId === null ? adicionarItem : salvarEdicao}
        >
          <Text style={styles.textoBotaoAdicionar}>
            {editandoId === null ? "Adicionar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparItens}>
        <Text style={styles.textoBotaoLimpar}>Limpar toda a coleção</Text>
      </TouchableOpacity>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ColecaoItem
            item={item}
            aoAlternarStatus={alternarStatus}
            aoExcluir={excluirItem}
            aoEditar={iniciarEdicao}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhum jogo cadastrado ainda.</Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  formulario: {
    flexDirection: "row",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },

  botaoAdicionar: {
    backgroundColor: "#2e86de",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  textoBotaoAdicionar: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoLimpar: {
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  textoBotaoLimpar: {
    color: "#fff",
    fontWeight: "bold",
  },

  listaConteudo: {
    paddingBottom: 20,
  },

  listaVazia: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
});
