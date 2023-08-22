export const TaskList = (props) => {
  const { name, Click1, Click2 } = props;
  const clickAqui = () => {
    console.log(name + "Terminado");
    Click1(name);
  };
  const Incompleto = () => {
    console.log(name + " Sin Terminar");
    Click2(name);
  };
  return (
    <ul>
      <article>
        <h3>{name}</h3>
        <button onClick={clickAqui}>Completado</button>
        <button onClick={Incompleto}>Sin completar</button>
      </article>
    </ul>
  );
};
