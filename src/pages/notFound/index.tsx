import { NavLink } from 'react-router';

function NotFound() {
  return (
    <>
      <title>404 Not Found</title>
      <h1>404 Not Found</h1>
      <NavLink to="/">To main page</NavLink>
    </>
  );
}

export default NotFound;
