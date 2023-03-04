export interface loginValues {
  email?: string;
  password?: string;
}

export interface registerValues {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface profileEditValues {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  current_password?: string;
  phone?: string;
  avatar?: string;
}
