import { useEffect } from 'react';

function Authorize({ closeForm }: Readonly<{ closeForm: () => void }>) {
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <div onClick={closeForm} className="fixed inset-0 z-5 flex items-center justify-center bg-black/30">
      <div onClick={(event) => event.stopPropagation()} className="bg-white p-40 shadow-md">
        <h2 className="text-[32px] font-bold">Login</h2>
        <div className="mt-24 flex flex-col">
          <input
            placeholder="username"
            className="mt-12 w-208 border-b-1 border-b-black p-5 text-center outline-none placeholder:text-black/70"
          />
          <input
            type="password"
            placeholder="password"
            className="mt-12 w-208 border-b-1 border-b-black p-5 text-center outline-none placeholder:text-black/70"
          />
          <button
            onClick={closeForm}
            className="mt-34 w-208 cursor-pointer border border-black p-12 transition-opacity hover:opacity-80 active:opacity-70"
          >
            SUBMIT
          </button>
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
