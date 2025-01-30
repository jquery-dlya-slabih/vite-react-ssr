export const getRecipes = async () => {
  const res = await fetch('https://dummyjson.com/recipes');
  return await res.json();
};

export const getRecipe = async (id: string) => {
  const res = await fetch('https://dummyjson.com/recipes/' + id);
  return await res.json();
};

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  return data.products;
};
