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

interface IProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  images: string[];
}
