import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ChangeEvent } from 'react';

import { login } from '@/data/auth.ts';

function Authorize({ closeForm }: Readonly<{ closeForm: () => void }>) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.overflow = 'scroll';
    };
  }, []);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set('accessToken', data.accessToken);
      queryClient.setQueryData(['me'], data);
      closeForm();
    }
  });

  const tryLogin = (event: MouseEvent<HTMLFormElement> | KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate({
      username: usernameValue,
      password: passwordValue
    });
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
    reset();
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    reset();
  };

  const inputErrorClassName = isError ? 'border-b-red-500 text-red-500' : '';

  return (
    <div
      onClick={closeForm}
      className="fixed inset-0 z-5 flex items-center justify-center bg-black/30 dark:bg-black/60"
    >
      <div onClick={(event) => event.stopPropagation()} className="bg-white dark:bg-neutral-900 p-40 shadow-md">
        <h2 className="text-[32px] font-bold">Login</h2>
        <div className="mt-24 flex flex-col">
          <form onSubmit={tryLogin} className="flex flex-col">
            <input
              autoFocus
              value={usernameValue}
              onChange={onChangeUsername}
              placeholder="username"
              required
              className={`custom-input ${inputErrorClassName}`}
            />
            <input
              value={passwordValue}
              onChange={onChangePassword}
              type="password"
              autoComplete="on"
              placeholder="password"
              required
              className={`custom-input ${inputErrorClassName}`}
            />
            <button disabled={isPending} type="submit" className="custom-button mt-34 disabled:cursor-progress">
              SUBMIT
            </button>
          </form>
          <button onClick={closeForm} className="custom-button mt-8">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authorize;
