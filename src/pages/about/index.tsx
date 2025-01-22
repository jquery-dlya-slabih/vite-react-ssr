import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';

interface IToDo {
  todo: string;
}

function About() {
  const query = useQuery<IToDo>({ queryKey: ['todos'] });

  return (
    <>
      <title>All about us</title>
      <h1>Hello from about page!</h1>
      <h2>{query.data?.todo}</h2>
      <NavLink to="/">To main page</NavLink>
    </>
  );
}

export default About;
