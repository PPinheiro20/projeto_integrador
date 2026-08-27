import { useEffect, useState } from "react";

import ColecaoItem from "../components/ColecaoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@colecao-app:itens";

const TIPOS = ["jogo", "livro", "filme"];
const LABELS_TIPO = { jogo: "Jogo", livro: "Livro", filme: "Filme" };

// Ordem de avanço do status ao tocar no badge do item
const ORDEM_STATUS = ["quero_comecar", "em_andamento", "concluido"];

export default function ColecaoScreen() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os itens salvos assim que a tela abre
  useEffect(() => {
    async function carregarItens() {
      try {
        const itensSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);

        if (itensSalvos !== null) {
          setItens(JSON.parse(itensSalvos));
        }
      } catch (erro) {
        console.error("Erro ao carregar itens do storage:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarItens();
  }, []);

  // Salva no storage toda vez que a lista de itens mudar
  useEffect(() => {
    if (carregando) return;

    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens)).catch((erro) => {
      console.error("Erro ao salvar itens no storage", erro);
    });
  }, [itens, carregando]);
}

function adicionarItem() {
  const titulo = textoInput.trim();

  if (titulo === "") return;

  const novoItem = {
    id: Date.now().toString(),
    titulo,
    tipo: tipoSelecionado,
    status: "quero_comecar",
  };

  setItens((itensAtuais) => [...itensAtuais, novoItem]);

  setTextoInput("");
}

function alternarStatus(id) {
  setItens((itensAtuais) =>
    itensAtuais.map((item) => {
      if (item.id != id) return item;

      const indiceAtual = ORDEM_STATUS.indexOf(item.status);
      const proximoIndice = (indiceAtual + 1) % ORDEM_STATUS.length;

      return { ...item, status: ORDEM_STATUS[proximoIndice] };
    }),
  );
}
