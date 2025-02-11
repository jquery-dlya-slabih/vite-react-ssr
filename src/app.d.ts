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

interface IResponse {
  total: number;
  limit: number;
  skip: number;
}

interface IProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  description: string;
  images: string[];
}

interface IProductResponse extends IResponse {
  products: IProduct[];
}

interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
}

interface IPostResponse extends IResponse {
  posts: IPost[];
}
