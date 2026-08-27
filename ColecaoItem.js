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
