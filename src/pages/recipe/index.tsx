import { NavLink, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

function Recipe() {
  const { id } = useParams();
  const { data } = useQuery<IRecipe>({ queryKey: ['recipe/' + id] });

  return (
    <>
      <title>{`Recipe of ${data?.name}`}</title>
      <meta name="description" content={'How to cook' + data?.name} />
      <h1>{data?.name}</h1>
      <div>
        <NavLink to="/">To main page</NavLink>
      </div>
      <div>
        <NavLink to="/recipes">To all recipes</NavLink>
      </div>
      <img src={data?.image} alt={data?.name} />
    </>
  );
}

export default Recipe;
