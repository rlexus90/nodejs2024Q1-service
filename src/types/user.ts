export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export const defaultUser: User = {
  login: 'Default User',
  password: 'Default Password',
  id: 'ae3e62ad-8d0d-4627-a556-a864b92e741c',
  version: 1,
  createdAt: 1710013156085,
  updatedAt: 1710013156085,
};
