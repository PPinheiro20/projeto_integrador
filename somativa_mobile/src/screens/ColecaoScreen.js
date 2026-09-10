
// Importa os Hooks do React:
// useState -> cria e controla estados
// useEffect -> executa códigos quando o componente é carregado ou quando algum estado muda
import { useEffect, useState } from "react";

// Importa os componentes visuais do React Native
import {
    FlatList,          // Cria uma lista otimizada
    StyleSheet,         // Permite criar os estilos
    Text,               // Exibe textos
    TextInput,          // Campo para digitar
    TouchableOpacity,   // Botão que pode ser pressionado
    View,               // Container para organizar elementos
} from "react-native";

// AsyncStorage permite salvar dados no celular
// Mesmo fechando o aplicativo, os dados continuam salvos
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importa o componente responsável por mostrar cada jogo da coleção
import ColecaoItem from "../components/ColecaoItem";


// Nome/chave usada para guardar a coleção no AsyncStorage
const CHAVE_STORAGE = "@colecao_jogos";


// Define a ordem em que os status dos jogos vão mudar
// Ao clicar no status:
// Quero jogar -> Jogando -> Concluído -> Quero jogar...
const ORDEM_STATUS = [
    "quero_jogar",
    "jogando",
    "concluido",
];


export default function ColecaoScreen() {

    // Guarda todos os jogos cadastrados
    // Exemplo:
    // [
    //   { id: "123", titulo: "GTA V", status: "jogando" }
    // ]
    const [itens, setItens] = useState([]);

    // Guarda o texto digitado no campo de nome do jogo
    const [textoInput, setTextoInput] = useState("");

    // Indica se o aplicativo ainda está carregando os dados
    // Começa como true para evitar salvar a lista vazia antes
    // de carregar os dados existentes
    const [carregando, setCarregando] = useState(true);

    // Guarda o ID do jogo que está sendo editado
    // null significa que nenhum jogo está sendo editado
    const [editandoId, setEditandoId] = useState(null);


    // =========================================================
    // CARREGAR OS DADOS
    // =========================================================

    // useEffect com [] executa apenas uma vez,
    // quando a tela é carregada
    useEffect(() => {

        // Função responsável por carregar os jogos
        async function carregarItens() {

            try {

                // Procura no AsyncStorage os dados salvos
                const itensSalvos =
                    await AsyncStorage.getItem(CHAVE_STORAGE);


                // Se encontrou dados salvos...
                if (itensSalvos !== null) {

                    // JSON.parse transforma o texto salvo
                    // novamente em um array/objeto JavaScript
                    setItens(JSON.parse(itensSalvos));
                }

            } catch (erro) {

                // Caso aconteça algum erro ao carregar
                console.error("Erro ao carregar itens:", erro);

            } finally {

                // Independentemente de dar erro ou não,
                // informa que o carregamento terminou
                setCarregando(false);
            }
        }


        // Executa a função de carregamento
        carregarItens();

    }, []);


    // =========================================================
    // SALVAR OS DADOS
    // =========================================================

    // Esse useEffect é executado sempre que:
    // - itens mudar
    // - carregando mudar
    useEffect(() => {

        // Enquanto os dados ainda estão sendo carregados,
        // não salva nada.
        // Isso evita apagar os dados antigos com uma lista vazia.
        if (carregando) return;


        // Salva a lista no AsyncStorage
        AsyncStorage.setItem(
            CHAVE_STORAGE,

            // JSON.stringify transforma o array JavaScript
            // em texto para poder ser armazenado
            JSON.stringify(itens)

        ).catch((erro) => {

            // Mostra no console caso aconteça algum erro
            console.error("Erro ao salvar itens:", erro);
        });

    }, [itens, carregando]);


    // =========================================================
    // ADICIONAR UM JOGO
    // =========================================================

    function adicionarItem() {

        // trim() remove espaços desnecessários
        // no começo e no final do texto
        const titulo = textoInput.trim();


        // Se o usuário não digitou nada,
        // a função termina aqui
        if (titulo === "") return;


        // Cria o objeto que representa o novo jogo
        const novoItem = {

            // Date.now() gera um número baseado no horário atual
            // String() transforma esse número em texto
            // É usado como ID do jogo
            id: Date.now().toString(),

            // Nome digitado pelo usuário
            titulo: titulo,

            // Todo jogo novo começa como "Quero jogar"
            status: "quero_jogar",

            // Começa com 0 horas jogadas
            horas: "0",

            // Começa sem comentário
            comentario: "",
        };


        // Adiciona o novo jogo ao array
        setItens((itensAtuais) => [

            // Mantém todos os jogos antigos
            ...itensAtuais,

            // Adiciona o novo jogo no final
            novoItem,
        ]);


        // Limpa o campo de texto depois de adicionar
        setTextoInput("");
    }


    // =========================================================
    // ALTERAR STATUS
    // =========================================================

    function alternarStatus(id) {

        // Percorre todos os jogos
        setItens((itensAtuais) =>
            itensAtuais.map((item) => {

                // Se não for o jogo clicado,
                // mantém o jogo sem alteração
                if (item.id !== id) return item;


                // Descobre em qual posição o status atual
                // está dentro do array ORDEM_STATUS
                const indiceAtual =
                    ORDEM_STATUS.indexOf(item.status);


                // Calcula qual será o próximo status
                //
                // O operador % faz com que, depois de "concluido",
                // volte para "quero_jogar"
                const proximoIndice =
                    (indiceAtual + 1) % ORDEM_STATUS.length;


                // Cria uma cópia do jogo
                // e altera somente o status
                return {
                    ...item,
                    status: ORDEM_STATUS[proximoIndice],
                };

            })
        );
    }


    // =========================================================
    // ALTERAR HORAS JOGADAS
    // =========================================================

    function alterarHoras(id, horas) {

        // Percorre todos os jogos
        setItens((itensAtuais) =>
            itensAtuais.map((item) =>

                // Se encontrar o jogo correto,
                // altera somente o campo horas
                item.id === id
                    ? { ...item, horas: horas }

                    // Caso contrário, mantém o jogo igual
                    : item
            )
        );
    }


    // =========================================================
    // ALTERAR COMENTÁRIO
    // =========================================================

    function alterarComentario(id, comentario) {

        // Percorre todos os jogos
        setItens((itensAtuais) =>
            itensAtuais.map((item) =>

                // Se o ID for igual,
                // altera somente o comentário
                item.id === id
                    ? { ...item, comentario: comentario }

                    // Mantém os outros jogos iguais
                    : item
            )
        );
    }


    // =========================================================
    // EXCLUIR UM JOGO
    // =========================================================

    function excluirItem(id) {

        // filter cria uma nova lista contendo
        // todos os jogos EXCETO o que possui o ID informado
        setItens((itensAtuais) =>
            itensAtuais.filter((item) => item.id !== id)
        );
    }


    // =========================================================
    // COMEÇAR A EDITAR
    // =========================================================

    function iniciarEdicao(item) {

        // Guarda o ID do jogo que será editado
        setEditandoId(item.id);

        // Coloca o nome atual do jogo no campo de texto
        // para o usuário poder alterá-lo
        setTextoInput(item.titulo);
    }


    // =========================================================
    // SALVAR EDIÇÃO
    // =========================================================

    function salvarEdicao() {

        // Remove espaços desnecessários
        const titulo = textoInput.trim();


        // Não salva se:
        // - o campo estiver vazio
        // - nenhum jogo estiver sendo editado
        if (titulo === "" || editandoId === null) return;


        // Percorre todos os jogos
        setItens((itensAtuais) =>
            itensAtuais.map((item) =>

                // Encontra o jogo que está sendo editado
                item.id === editandoId

                    // Cria uma cópia e altera o título
                    ? { ...item, titulo: titulo }

                    // Mantém os outros jogos
                    : item
            )
        );


        // Limpa o campo de texto
        setTextoInput("");

        // Sai do modo de edição
        setEditandoId(null);
    }


    // =========================================================
    // LIMPAR TODA A COLEÇÃO
    // =========================================================

    function limparItens() {

        // Substitui a lista atual por uma lista vazia
        setItens([]);
    }


    // =========================================================
    // PARTE VISUAL DA TELA
    // =========================================================

    return (
        <View style={styles.container}>

            {/* Título da tela */}
            <Text style={styles.titulo}>
                Minha Coleção
            </Text>


            {/* Área que contém o campo de texto e o botão */}
            <View style={styles.formulario}>

                {/* Campo onde o usuário digita o nome do jogo */}
                <TextInput
                    style={styles.input}

                    placeholder="Nome do jogo..."
                    placeholderTextColor="#777"

                    // Valor atual do campo
                    value={textoInput}

                    // Atualiza textoInput sempre que o usuário digita
                    onChangeText={setTextoInput}

                    // Executa adicionarItem ou salvarEdicao
                    // quando o usuário aperta "OK/Done" no teclado
                    onSubmitEditing={
                        editandoId === null
                            ? adicionarItem
                            : salvarEdicao
                    }

                    // Altera o botão do teclado para "Done"
                    returnKeyType="done"
                />


                {/* Botão de adicionar/salvar */}
                <TouchableOpacity
                    style={styles.botaoAdicionar}

                    // Se não estiver editando:
                    // chama adicionarItem
                    //
                    // Se estiver editando:
                    // chama salvarEdicao
                    onPress={
                        editandoId === null
                            ? adicionarItem
                            : salvarEdicao
                    }
                >

                    {/* O texto também muda dependendo do modo */}
                    <Text style={styles.textoBotaoAdicionar}>
                        {editandoId === null ? "Adicionar" : "Salvar"}
                    </Text>

                </TouchableOpacity>
            </View>


            {/* Botão que limpa toda a coleção */}
            <TouchableOpacity
                style={styles.botaoLimpar}
                onPress={limparItens}
            >
                <Text style={styles.textoBotaoLimpar}>
                    Limpar toda a coleção
                </Text>
            </TouchableOpacity>


            {/* =================================================
                LISTA DE JOGOS
                ================================================= */}

            <FlatList

                // Array que será mostrado na lista
                data={itens}

                // Define uma chave única para cada item
                keyExtractor={(item) => item.id}

                // Diz ao FlatList como cada jogo deve ser mostrado
                renderItem={({ item }) => (

                    // Componente que representa cada jogo
                    <ColecaoItem

                        // Envia o jogo atual
                        item={item}

                        // Envia as funções para o ColecaoItem
                        // poder executar ações na tela principal
                        aoAlternarStatus={alternarStatus}
                        aoExcluir={excluirItem}
                        aoEditar={iniciarEdicao}
                        aoAlterarHoras={alterarHoras}
                        aoAlterarComentario={alterarComentario}
                    />
                )}


                // Aparece quando não existe nenhum jogo
                ListEmptyComponent={
                    <Text style={styles.listaVazia}>
                        Nenhum jogo cadastrado ainda.
                    </Text>
                }


                // Espaço no final da lista
                contentContainerStyle={styles.listaConteudo}
            />

        </View>
    );
}


// =============================================================
// ESTILOS DA TELA
// =============================================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#08060D",
        paddingTop: 60,
        paddingHorizontal: 16,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 22,
        textAlign: "center",
    },

    formulario: {
        flexDirection: "row",
        marginBottom: 14,
    },

    input: {
        flex: 1,
        backgroundColor: "#100D18",
        borderWidth: 1,
        borderColor: "#7028C9",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 11,
        marginRight: 8,
        color: "#FFFFFF",
    },

    botaoAdicionar: {
        backgroundColor: "#7028C9",
        borderWidth: 1,
        borderColor: "#A855F7",
        borderRadius: 10,
        paddingHorizontal: 17,
        justifyContent: "center",
    },

    textoBotaoAdicionar: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },

    botaoLimpar: {
        backgroundColor: "#0B0910",
        borderWidth: 1,
        borderColor: "#A855F7",
        borderRadius: 10,
        padding: 12,
        alignItems: "center",
        marginBottom: 18,
    },

    textoBotaoLimpar: {
        color: "#A855F7",
        fontWeight: "bold",
        fontSize: 13,
    },

    listaConteudo: {
        paddingBottom: 30,
    },

    listaVazia: {
        textAlign: "center",
        color: "#A78BFA",
        marginTop: 30,
        fontSize: 15,
    },
});