export const getTopProducts = async (): Promise<IProduct[]> => {
  const res = await fetch('https://dummyjson.com/products?limit=3');
  const data = await res.json();

  return data.products;
};

export const getProducts = async ({ pageParam }: { pageParam: number }): Promise<IProductResponse> => {
  const res = await fetch(`https://dummyjson.com/products?limit=${4}&skip=${3 + pageParam}`);
  return await res.json();
};

export const getProduct = async (id: string): Promise<IProduct> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await res.json();
};

export const getPosts = async ({ pageParam }: { pageParam: number }): Promise<IPostsResponse> => {
  const res = await fetch(`https://dummyjson.com/posts/tag/love?limit=${4}&skip=${1 + pageParam}`);
  return await res.json();
};

export const getPost = async (id: string): Promise<IPost> => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return await res.json();
};

export const getMainPost = async (): Promise<IPost> => {
  const res = await fetch(`https://dummyjson.com/posts/tag/love?limit=1`);
  const data = await res.json();

  return data.posts[0];
};

export const checkAuth = async (): Promise<IUserResponse> => {
  const accessToken = document.cookie
    .split(';')
    .find((cookie) => cookie.includes('accessToken='))
    ?.replace('accessToken=', '');

  const res = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (res.status !== 200) {
    throw new Error('not authorized');
  }

  return await res.json();
};

export const login = async ({ username, password }: ILoginCredentials): Promise<IUserResponse> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.status !== 200) {
    throw new Error('error while logging in');
  }

  const data = await res.json();

  if (data.accessToken) {
    document.cookie = `accessToken=${data.accessToken}`;
  }

  return data;
};
