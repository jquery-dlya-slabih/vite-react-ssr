import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '@/api.ts';

import type { KeyboardEvent, MouseEvent, ChangeEvent } from 'react';

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

  return (
    <div onClick={closeForm} className="fixed inset-0 z-5 flex items-center justify-center bg-black/30">
      <div onClick={(event) => event.stopPropagation()} className="bg-white p-40 shadow-md">
        <h2 className="text-[32px] font-bold">Login</h2>
        <div className="mt-24 flex flex-col">
          <form onSubmit={tryLogin} className="flex flex-col">
            <input
              autoFocus
              value={usernameValue}
              onChange={onChangeUsername}
              placeholder="username"
              required
              className={`mt-12 w-208 border-b-1 p-5 text-center outline-none placeholder:text-black/70 ${isError ? 'border-b-red-500 text-red-500' : 'border-b-black'}`}
            />
            <input
              value={passwordValue}
              onChange={onChangePassword}
              type="password"
              autoComplete="on"
              placeholder="password"
              required
              className={`mt-12 w-208 border-b-1 p-5 text-center outline-none placeholder:text-black/70 ${isError ? 'border-b-red-500 text-red-500' : 'border-b-black'}`}
            />
            <button
              disabled={isPending}
              type="submit"
              className="mt-34 w-208 cursor-pointer border border-black p-12 transition-opacity hover:opacity-80 active:opacity-70 disabled:cursor-progress disabled:border-black/50 disabled:text-black/50"
            >
              SUBMIT
            </button>
          </form>
          <button
            onClick={closeForm}
            className="mt-8 w-208 cursor-pointer border border-black p-12 transition-opacity hover:opacity-80 active:opacity-70"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authorize;
