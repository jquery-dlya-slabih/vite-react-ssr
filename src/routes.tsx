import Main from '@/routes/main.tsx';
import Recipes from '@/routes/recipes.tsx';
import Recipe from '@/routes/recipe.tsx';
import NotFound from '@/routes/notFound.tsx';

export enum PATH {
  MAIN = '/',
  RECIPES = '/recipes',
  RECIPE = '/recipes/:id',
  NOT_FOUND = '*'
}

export default [
  {
    path: PATH.MAIN,
    element: <Main />
  },
  {
    path: PATH.RECIPES,
    element: <Recipes />
  },
  {
    path: PATH.RECIPE,
    element: <Recipe />
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />
  }
];
