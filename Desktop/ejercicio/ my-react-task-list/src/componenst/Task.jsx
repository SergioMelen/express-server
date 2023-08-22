import { TaskList } from "./TaskList";

export const Task = (props) => {
  const { list } = props;
  const hacerClick = (A1) => {
    console.log("click en terminado " + A1);
  };
  const hacerClick2 = (A2) => {
    console.log("click en sin terminar " + A2);
  };
  return (
    <ul>
      {list.map((TiempoDePelicula) => (
        <TaskList
          name={TiempoDePelicula.name}
          Click1={hacerClick}
          Click2={hacerClick2}
        />
      ))}
    </ul>
  );
};
