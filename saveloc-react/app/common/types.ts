export type LoginCredentials = { email: String; password: String };
export type LoginValidations = {
  email: { valid: boolean; message: String | null };
  password: { valid: boolean; message: String | null };
};
export type RegisterCredentials = {
  email: String;
  password: String;
  name: String;
  surname: String;
};
export type RegisterValidations = {
  email: { valid: boolean; message: String | null };
  password: { valid: boolean; message: String | null };
  name: { valid: boolean; message: String | null };
  surname: { valid: boolean; message: String | null };
};

export type LoginResponse = {
  success: boolean;
  message?: string;
};
