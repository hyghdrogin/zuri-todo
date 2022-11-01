export interface UserInterface {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  googleId?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  person: UserInterface;
  file: object;
  params: object;
  query: object;
  path: object;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  createdAt?: Date
  updatedAt?: Date
}

export interface LoginInterface {
  username: string;
  password: string;
}
