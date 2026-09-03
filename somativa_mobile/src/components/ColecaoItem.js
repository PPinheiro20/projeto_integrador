import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
}) {
  return (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.titulo}</Text>

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
