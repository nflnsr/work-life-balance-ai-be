type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  isStudent: boolean;
  age: number;
  field: string;
  hobbies: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type Register = {
  email: string;
  name: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  isStudent: boolean;
  age: number;
  field: string;
  hobbies: string;
};

type Login = {
  email: string;
  password: string;
};

export type { User, Login, Register };
