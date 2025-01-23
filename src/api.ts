export const getRecipes = async () => {
  console.log('getRecipes');

  const res = await fetch('https://dummyjson.com/recipes');
  return await res.json();
};

export const getRecipe = async (id: string) => {
  console.log('getRecipe with id: ' + id);

  const res = await fetch('https://dummyjson.com/recipes/' + id);
  return await res.json();
};
