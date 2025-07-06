export const Header = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Cine React</h1>
      <p className="text-center">Tu aplicación de cine favorita</p>

      <nav className="flex justify-center space-x-4">
        <a href="/" className="text-blue-500 hover:underline">
          Inicio
        </a>
        <a href="/peliculas" className="text-blue-500 hover:underline">
          Películas
        </a>
        <a href="/series" className="text-blue-500 hover:underline">
          Series
        </a>
      </nav>
      <hr className="my-4" />
    </div>
  );
};
