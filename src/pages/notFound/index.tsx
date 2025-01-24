import { NavLink } from 'react-router';

function NotFound() {
  return (
    <>
      <h1>Not found 404</h1>
      <NavLink to="/">To main page</NavLink>
    </>
  );
}

export default NotFound;
