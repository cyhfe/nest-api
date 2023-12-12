export interface SecurityConfig {
  expiresIn: string;
  saltRounds: number;
}
export interface Config {
  security: SecurityConfig;
}

const config: Config = {
  security: {
    expiresIn: '7d',
    saltRounds: 10,
  },
};

export default (): Config => config;
