export interface UserType {
  username: string;
  password: string;
}

export interface DecodedTokenSchema {
  token_type: string;
  exp: number | string;
  iat: number | string;
  jti: string;
  user_id: number | string;
}

export interface AuthSchema {
  access: string;
  refresh: string;
}

export interface ErrorPayload {
  data: string;
  status: string;
}

export interface UserSchema {
  id: string | number;
  username: string;
  location: string;
  date_joined: string;
  last_login: string;
}

export interface TokenSchema {
  access: string;
  refresh: string;
}

export interface JournalInputType {
  title: string;
  content: string;
  user: string | number;
  owner: string;
}

export interface JournalType {
  id: string | number;
  title: string;
  content: string;
  user: string | number;
  owner: string;
  created_date: string;
  location: string;
}

export interface LikesType {
  id: string | number;
  user: string | number;
  journals: string | number;
}

export interface LikesInputType {
  user: string | number;
  journals: string | number;
}
