interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  tags: string[];
  image: string;
}

interface IRecipes {
  recipes: IRecipe[];
}
