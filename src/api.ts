export const getRecipes = () => {
  console.log('getRecipes');

  return fetch('https://dummyjson.com/recipes')
    .then((res) => res.json())
    .then((data) => data);
};

export const getRecipe = (id: string) => {
  console.log('getRecipe with id: ' + id);

  return fetch('https://dummyjson.com/recipes/' + id)
    .then((res) => res.json())
    .then((data) => data);
};
