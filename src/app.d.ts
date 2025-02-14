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

interface IPostsResponse extends IResponse {
  posts: IPost[];
}

interface IUserResponse {
  firstName?: string;
  email?: string;
  image?: string;
  accessToken?: string;
  loginError?: boolean;
}

interface ILoginCredentials {
  username: string;
  password: string;
}
