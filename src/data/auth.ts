import { queryOptions } from '@tanstack/react-query';
import * as v from 'valibot';

const UserSchema = v.object({
  firstName: v.string(),
  email: v.pipe(v.string(), v.email()),
  image: v.string(),
  accessToken: v.string()
});

type User = v.InferOutput<typeof UserSchema>;

const checkAuth = async (): Promise<User> => {
  const accessToken = document.cookie
    .split(';')
    .find((cookie) => cookie.includes('accessToken='))
    ?.replace('accessToken=', '');

  const res = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (res.status !== 200) {
    throw new Error('not authorized');
  }

  return await res.json();
};

export const login = async ({ username, password }: { username: string; password: string }): Promise<User> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
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
