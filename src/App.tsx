import { useEffect, useState } from "react";
import { Content, MovieProps } from "./components/Content";
import { Header } from "./components/Header";
import { GenreResponseProps, SideBar } from "./components/SideBar";
import { api } from "./services/api";
import "./styles/content.scss";
import "./styles/global.scss";
import "./styles/sidebar.scss";


export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
      setSelectedGenre(response.data[0]);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenre]);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        currentGenre={(genre) => handleClickButton(genre)}
      />
      
      <div className="container">
        <Header categoryTitle={selectedGenre.title} />
        <Content movies={movies} />
      </div>
    </div>
  );
}
