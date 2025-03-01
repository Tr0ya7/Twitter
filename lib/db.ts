import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

// Inicia a conexão com o banco de dados
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Usando uma variável global para evitar reconexões durante o HMR no modo de desenvolvimento
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  clientPromise = globalWithMongo._mongoClient.connect(); // Conexão assíncrona
  client = globalWithMongo._mongoClient;
} else {
  // Em produção, evitamos a variável global
  clientPromise = new MongoClient(uri, options).connect(); // Conexão assíncrona
  client = new MongoClient(uri, options);
}

// Exportando a promessa de conexão
export default clientPromise;
