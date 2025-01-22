export const getToDo = () =>
  fetch('https://dummyjson.com/todos/1')
    .then((res) => res.json())
    .then((data) => data);
