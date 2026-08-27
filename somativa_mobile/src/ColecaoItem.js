import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Componente responsável por renderizar UM item da coleção.
// Recebe o item e funções (callbacks) vindas do componente pai (ColecaoScreen).

const LABELS_TIPO = {
  jogo: "🎮 Jogo",
  livro: "📖 Livro",
  filme: "🎬 Filme",
};

const LABELS_STATUS = {
  quero_comecar: "Quero começar",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

const CORES_STATUS = {
  quero_comecar: "#f39c12",
  em_andamento: "#2e86de",
  concluido: "#27ae60",
};

export default function ColecaoItem({
  item,
  aoAlternarStatus,
  aoExcluir,
  aoEditar,
}) {
  return (
    <View style={styles.item}>
      <View style={styles.linhaTopo}>
        <Text style={styles.tipo}>{LABELS_TIPO[item.tipo]}</Text>
        <Text style={styles.titulo}>{item.titulo}</Text>
      </View>

      <View style={styles.linhaAcoes}>
        {/* Ao tocar no status, avança para o próximo da sequência:
            quero começar -> em andamento -> concluído -> quero começar */}
        <TouchableOpacity
          style={[
            styles.badgeStatus,
            { backgroundColor: CORES_STATUS[item.status] },
          ]}
          onPress={() => aoAlternarStatus(item.id)}
        >
          <Text style={styles.textoBadge}>{LABELS_STATUS[item.status]}</Text>
        </TouchableOpacity>

        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => aoEditar(item)}
          >
            <Text style={styles.textoBotaoEditar}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => aoExcluir(item.id)}
          >
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    elevation: 2,
  },

  linhaTopo: {
    marginBottom: 8,
  },

  tipo: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },

  titulo: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },

  linhaAcoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  badgeStatus: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  textoBadge: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },

  botoes: {
    flexDirection: "row",
  },

  botaoEditar: {
    backgroundColor: "#2e86de",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
  },

  textoBotaoEditar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  }
})