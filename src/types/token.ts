export enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export type Payload = {
  id: string;
  login: string;
  type: TokenType;
};
