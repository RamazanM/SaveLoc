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

export type CreatePlaceRequest = {
  name: string;
  description: string;
  lat: number;
  long: number;
  photos: string[];
};

export type PlaceResponse = {
  id: string;
  name: string;
  description: string;
  lat: number;
  long: number;
  createdBy: string;
  createdDate: string;
  modifiedDate: string;
  photos: string[];
};