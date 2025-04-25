import { queryOptions } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import * as v from 'valibot';

const UserSchema = v.object({
  firstName: v.string(),
  email: v.pipe(v.string(), v.email()),
  image: v.string(),
  accessToken: v.string()
});

const LoginSchema = v.object({
  username: v.pipe(v.string(), v.minLength(4)),
  password: v.pipe(v.string(), v.minLength(7))
});

type User = v.InferOutput<typeof UserSchema>;
type Login = v.InferOutput<typeof LoginSchema>;

const checkAuth = async (): Promise<User> => {
  const res = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    }
  });

  if (res.status !== 200) {
    throw new Error('not authorized');
  }

  return await res.json();
};

export const login = async (loginData: Login): Promise<User> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(v.parse(LoginSchema, loginData))
  }).then((res) => res.json());

  try {
    return v.parse(UserSchema, res);
  } catch {
    throw new Error();
  }
};

export const checkAuthQuery = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: checkAuth,
    retry: 1,
    retryDelay: 3000
  });
