// Importa componentes do React Native
import {
  StyleSheet,          // Criação dos estilos
  Text,                // Exibição de textos
  TouchableOpacity,    // Botões clicáveis
  View,                // Organização dos elementos
  TextInput,           // Campos para digitação
} from "react-native";


// =============================================================
// NOMES DOS STATUS
// =============================================================

// O aplicativo guarda os status como códigos,
// mas mostra textos mais amigáveis para o usuário.
const LABELS_STATUS = {

  // Código "quero_jogar" aparece como "Quero jogar"
  quero_jogar: "Quero jogar",

  // Código "jogando" aparece como "Jogando"
  jogando: "Jogando",

  // Código "concluido" aparece como "Concluído"
  concluido: "Concluído",
};


// =============================================================
// CORES DOS STATUS
// =============================================================

// Cada status possui uma cor diferente.
const CORES_STATUS = {

  // Amarelo para "Quero jogar"
  quero_jogar: "#F2A900",

  // Azul para "Jogando"
  jogando: "#2684FF",

  // Verde para "Concluído"
  concluido: "#35C759",
};


// =============================================================
// COMPONENTE COLECAOITEM
// =============================================================

// Recebe informações e funções do ColecaoScreen.
//
// item -> jogo que será exibido
// aoAlternarStatus -> muda o status do jogo
// aoExcluir -> exclui o jogo
// aoEditar -> inicia a edição
// aoAlterarHoras -> altera horas jogadas
// aoAlterarComentario -> altera comentário
export default function ColecaoItem({
  item,
  aoAlternarStatus,
  aoExcluir,
  aoEditar,
  aoAlterarHoras,
  aoAlterarComentario,
}) {


  // ===========================================================
  // VERIFICAÇÃO DOS DETALHES
  // ===========================================================

  // Horas e comentários só aparecem quando o jogo está:
  //
  // "jogando" OU "concluido"
  //
  // Se estiver "quero_jogar", esses campos ficam escondidos.
  const permitirDetalhes =
    item.status === "jogando" ||
    item.status === "concluido";


  // ===========================================================
  // PARTE VISUAL DO ITEM
  // ===========================================================

  return (

    // Container que representa o card do jogo
    <View style={styles.item}>


      {/* Mostra o nome do jogo */}
      <Text style={styles.titulo}>
        {item.titulo}
      </Text>


      {/* =====================================================
          CAMPO DE HORAS
          ===================================================== */}

      {/*

        "&&" significa:

        Se permitirDetalhes for true,
        mostra o conteúdo que está depois do &&.

        Se for false, não mostra nada.

      */}

      {permitirDetalhes && (

        <View style={styles.linhaHoras}>

          {/* Campo para informar horas jogadas */}
          <TextInput
            style={styles.inputHoras}

            // Abre teclado numérico
            keyboardType="numeric"

            // Mostra o valor atual das horas
            //
            // String() garante que o valor seja tratado
            // como texto pelo TextInput
            value={item.horas ? String(item.horas) : ""}

            // Quando o usuário digita,
            // chama a função do ColecaoScreen
            onChangeText={(texto) =>
              aoAlterarHoras(item.id, texto)
            }

            placeholder="0"
            placeholderTextColor="#555"
          />


          {/* Texto ao lado do campo */}
          <Text style={styles.textoHoras}>
              Horas Jogadas
          </Text>

        </View>
      )}


      {/* =====================================================
          CAMPO DE COMENTÁRIO
          ===================================================== */}

      {/* Só aparece quando o status permite detalhes */}
      {permitirDetalhes && (

        <View style={styles.secaoComentario}>

          {/* Nome do campo */}
          <Text style={styles.labelComentario}>
            Comentário / Anotações
          </Text>


          {/* Campo para escrever o comentário */}
          <TextInput
            style={styles.inputComentario}

            // Permite escrever várias linhas
            multiline

            placeholder="Escreva uma anotação sobre o jogo..."
            placeholderTextColor="#555"

            // Mostra o comentário atual
            //
            // || "" evita problemas caso comentario
            // seja null ou undefined
            value={item.comentario || ""}

            // Atualiza o comentário
            onChangeText={(texto) =>
              aoAlterarComentario(item.id, texto)
            }
          />

        </View>
      )}


      {/* =====================================================
          LINHA DE AÇÕES
          ===================================================== */}

      <View style={styles.linhaAcoes}>


        {/* ===================================================
            BOTÃO DE STATUS
            =================================================== */}

        <TouchableOpacity

          // Usa o estilo padrão e adiciona
          // uma cor de borda de acordo com o status
          style={[
            styles.badgeStatus,
            {
              borderColor: CORES_STATUS[item.status],
            },
          ]}

          // Quando clicar, muda o status
          onPress={() =>
            aoAlternarStatus(item.id)
          }
        >

          <Text

            // Usa o estilo padrão e muda a cor
            // de acordo com o status
            style={[
              styles.textoBadge,
              {
                color: CORES_STATUS[item.status],
              },
            ]}
          >

            {/*

              Procura o texto correspondente ao status.

              Exemplo:

              item.status = "jogando"

              LABELS_STATUS["jogando"]

              resultado = "Jogando"

            */}
            {LABELS_STATUS[item.status]}

          </Text>

        </TouchableOpacity>


        {/* ===================================================
            BOTÕES EDITAR E EXCLUIR
            =================================================== */}

        <View style={styles.botoes}>


          {/* Botão Editar */}
          <TouchableOpacity
            style={styles.botaoEditar}

            // Envia o jogo inteiro para a função de edição
            onPress={() => aoEditar(item)}
          >

            <Text style={styles.textoBotao}>
              Editar
            </Text>

          </TouchableOpacity>


          {/* Botão Excluir */}
          <TouchableOpacity
            style={styles.botaoExcluir}

            // Envia apenas o ID do jogo
            // para a função de exclusão
            onPress={() => aoExcluir(item.id)}
          >

            <Text style={styles.textoBotaoExcluir}>
              Excluir
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}


// =============================================================
// ESTILOS DO ITEM
// =============================================================

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