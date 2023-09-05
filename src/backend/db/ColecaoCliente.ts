import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import * as firebase from "../config";

export default class ColecaoCliente implements ClienteRepositorio {

    private conversor = {
        toFirestore (cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        },

        fromFirestore (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (!cliente.id) {
            await firebase.firestore.addDoc(this.colecao(), cliente)
        } else {
            await firebase.firestore.setDoc(this.documento(cliente), cliente)
        }
        
        return cliente
    }

    async excluir(cliente: Cliente): Promise<void> {
        return firebase.firestore.deleteDoc(this.documento(cliente))
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await firebase.firestore.getDocs(this.colecao())
        
        return query.docs.map(doc => doc.data())
    }

    private colecao() {
        return firebase.firestore.collection(firebase.dataBase, 'clientes').withConverter(this.conversor)
    }

    private documento(cliente: Cliente) {
        return firebase.firestore.doc(firebase.dataBase, 'clientes', cliente.id).withConverter(this.conversor)
    }
}