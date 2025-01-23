import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getRecipes } from '@/api.ts';

function Recipes() {
  const query = useQuery<IRecipes>({ queryKey: ['recipes'], queryFn: getRecipes });

  return (
    <>
      <title>Recipes</title>
      <meta name="description" content="All recipes for cooking" />
      <h1>Recipes</h1>
      <NavLink to="/">To main page</NavLink>
      {query.data?.recipes.map((recipe: IRecipe) => (
        <div key={recipe.id}>
          <NavLink to={'/recipes/' + recipe.id}>{recipe.name}</NavLink>
        </div>
      ))}
    </>
  );
}

export default Recipes;
