export enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export type Payload = {
  userId: string;
  login: string;
  type: TokenType;
};
