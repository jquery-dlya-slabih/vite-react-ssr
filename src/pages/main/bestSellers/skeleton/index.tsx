const Skeleton = () => (
  <div data-testid="skeleton" className="basis-1/2 w-full first:mr-20 animate-pulse">
    <div className="bg-linear-to-r h-138 from-violet-400 to-pink-500" />
    <div className="mt-12 h-8 w-[50%] rounded-full bg-gray-300" />
    <div className="mt-8 h-8 rounded bg-gray-300" />
    <div className="mt-8 h-8 w-[35%] rounded bg-gray-300" />
  </div>
);

export default Skeleton;
