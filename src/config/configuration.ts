export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}
export interface Config {
  security: SecurityConfig;
}

const config: Config = {
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
