import { api } from '../api/apiClient';

export interface LoginForm {
  email: string;
  password: string;
}

// export interface LoginResponse {
//   token: string;
//   user: {
//     id: string;
//     role: string[];
//     [key: string]: any;
//   };
//   message?: string;
// }

export const loginUser = async (form: LoginForm) => {
  const response = await api.post('/auth/login',
    form,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data;
};
