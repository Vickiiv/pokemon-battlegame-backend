const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Environment variable ${name} is missing from .env!`);
  }
  return value;
};

export const env = {
  mongoUri: requireEnv("MONGO_URI"),
  jwtSecret: requireEnv("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  isDevelopment: process.env.NODE_ENV === "development",
};
