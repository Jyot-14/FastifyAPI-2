import fastify, { FastifyInstance } from 'fastify';
import { FastifyJWTOptions } from '@fastify/jwt';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongodb';

dotenv.config();

const server: FastifyInstance = fastify();

server.register(fastifyJwt, {
  secret: 'supersecret',
} as FastifyJWTOptions);

// mongodb connection
async function connectMongoDB(): Promise<void> {
  try {
    const mongoURL =
      'mongodb+srv://jyot:jyot@cluster0.ye24tq8.mongodb.net/?retryWrites=true&w=majority';
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log('Database connection successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectMongoDB();

// routes
server.register(import('./routes/signup'));
server.register(import('./routes/login'));

// port run 3000
const port = 5000;

server.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
