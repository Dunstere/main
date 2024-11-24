import 'dotenv/confi';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa o módulo Express para criar o servidor web e o módulo conectarAoBanco para estabelecer a conexão com o banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Estabelece a conexão com o banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO. O resultado da conexão é armazenado na variável conexao.


export async function getTodosPosts() {
  // Função assíncrona para obter todos os posts do banco de dados.
  const db = conexao.db("imersao-instabytes");
  // Seleciona o banco de dados "imersao-instabytes" dentro da conexão estabelecida.
  const colecao = db.collection("posts");
  // Seleciona a coleção "posts" dentro do banco de dados.
  return colecao.find().toArray();
  // Executa a operação de busca em todos os documentos da coleção e retorna um array com os resultados.
}

export async function criarPost(novoPost){
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost){
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}