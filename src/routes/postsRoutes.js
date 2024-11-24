// Importa o framework Express para criar o servidor
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções do controlador de posts para lidar com a lógica dos posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
}

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo para os arquivos carregados (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância de upload do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas para o servidor
const routes = (app) => {
  // Habilita o middleware para analisar dados JSON de entrada
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota GET para listar posts (chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar novos posts (chama a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para fazer upload de uma única imagem chamada "imagem" (usa o middleware upload e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)

};

// Exporta a função de rotas como a exportação padrão
export default routes;