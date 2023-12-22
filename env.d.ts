declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_CONNECT_STRING: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
