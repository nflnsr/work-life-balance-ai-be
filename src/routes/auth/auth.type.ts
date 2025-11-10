type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  name: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  isStudent: boolean;
  age: number;
  pekerjaan: string;
  hobbies: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Login, Register };

