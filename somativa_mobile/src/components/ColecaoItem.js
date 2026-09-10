import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";

const LABELS_STATUS = {
  quero_jogar: "Quero jogar",
  jogando: "Jogando",
  concluido: "Concluído",
};

const CORES_STATUS = {
  quero_jogar: "#F2A900",
  jogando: "#2684FF",
  concluido: "#35C759",
};

export default function ColecaoItem({
  item,
  aoAlternarStatus,
  aoExcluir,
  aoEditar,
  aoAlterarHoras,
  aoAlterarComentario,
}) {
  // Regra: só exibe horas e comentários se o status for "jogando" ou "concluido"
  const permitirDetalhes = item.status === "jogando" || item.status === "concluido";

  return (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.titulo}</Text>

      {/* Renderização condicional do campo de horas */}
      {permitirDetalhes && (
        <View style={styles.linhaHoras}>
          <TextInput
            style={styles.inputHoras}
            keyboardType="numeric"
            value={item.horas ? String(item.horas) : ""}
            onChangeText={(texto) => aoAlterarHoras(item.id, texto)}
            placeholder="0"
            placeholderTextColor="#555"
          />

          <Text style={styles.textoHoras}>   Horas Jogadas</Text>
        </View>
      )}

      {/* Renderização condicional do campo de comentário */}
      {permitirDetalhes && (
        <View style={styles.secaoComentario}>
          <Text style={styles.labelComentario}>Comentário / Anotações</Text>
          <TextInput
            style={styles.inputComentario}
            multiline
            placeholder="Escreva uma anotação sobre o jogo..."
            placeholderTextColor="#555"
            value={item.comentario || ""}
            onChangeText={(texto) => aoAlterarComentario(item.id, texto)}
          />
        </View>
      )}

      <View style={styles.linhaAcoes}>
        <TouchableOpacity
          style={[
            styles.badgeStatus,
            {
              borderColor: CORES_STATUS[item.status],
            },
          ]}
          onPress={() => aoAlternarStatus(item.id)}
        >
          <Text
            style={[
              styles.textoBadge,
              {
                color: CORES_STATUS[item.status],
              },
            ]}
          >
            {LABELS_STATUS[item.status]}
          </Text>
        </TouchableOpacity>

        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => aoEditar(item)}
          >
            <Text style={styles.textoBotao}>Editar</Text>
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
    backgroundColor: "#0E0B15",
    borderWidth: 1,
    borderColor: "#281A3D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  titulo: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 14,
  },

  linhaHoras: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  textoHoras: {
    color: "#A78BFA",
    fontSize: 14,
    marginRight: 8,
    fontWeight: "bold",
  },

  inputHoras: {
    backgroundColor: "#100D18",
    borderWidth: 1,
    borderColor: "#7028C9",
    borderRadius: 6,
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
    textAlign: "center",
  },

  secaoComentario: {
    marginBottom: 14,
  },

  labelComentario: {
    color: "#A78BFA",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },

  inputComentario: {
    backgroundColor: "#100D18",
    borderWidth: 1,
    borderColor: "#281A3D",
    borderRadius: 8,
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    minHeight: 50,
    textAlignVertical: "top",
  },

  linhaAcoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  badgeStatus: {
    backgroundColor: "#0B0910",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderWidth: 1,
  },

  textoBadge: {
    fontWeight: "bold",
    fontSize: 11,
  },

  botoes: {
    flexDirection: "row",
  },

  botaoEditar: {
    backgroundColor: "#0B0910",
    borderWidth: 1,
    borderColor: "#A855F7",
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
    marginRight: 7,
  },

  textoBotao: {
    color: "#A855F7",
    fontWeight: "bold",
    fontSize: 12,
  },

  botaoExcluir: {
    backgroundColor: "#0B0910",
    borderWidth: 1,
    borderColor: "#E74C3C",
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
  },

  textoBotaoExcluir: {
    color: "#E74C3C",
    fontWeight: "bold",
    fontSize: 12,
  },
});