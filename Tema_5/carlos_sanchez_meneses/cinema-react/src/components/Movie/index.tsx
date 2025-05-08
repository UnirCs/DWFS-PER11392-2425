interface MovieProps {
  id: number;
  image: string;
  sinopsis: string;
  duration: string;
  genre: string;
  title: string;
  score: number;
  url: string;
}
export const Movie = (props: MovieProps) => {
  const { id, image, sinopsis, duration, genre, title, score, url } = props;
  return (
    <article>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex ">
        <img className="w-80 h-48 object-cover" src={image} alt={title} />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{sinopsis}</p>
          <p className="text-gray-600">Duración: {duration}</p>
          <p className="text-gray-600">Género: {genre}</p>
          <p className="text-gray-600">Puntuación: {score}</p>
          <a href={`${url}/${id}`} className="text-blue-500 hover:underline">
            Ver más
          </a>
        </div>
      </div>
    </article>
  );
};
