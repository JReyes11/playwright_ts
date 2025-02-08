export interface userSignUp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface userSignIn {
  username: string;
  password: string;
}

export interface transaction {
  name: string;
  username: string;
  amount: string;
  note: string;
}
