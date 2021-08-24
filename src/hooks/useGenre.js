const useGenre = (setSelectedGeneres) => {
  if (setSelectedGeneres < 1) return "";

  const GenreId = setSelectedGeneres.map((g) => g.id);
  return (GenreId.reduce((accu, curr) => (accu + ", " + curr)));
}

export default useGenre
