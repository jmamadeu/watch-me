import { useState } from "react";
import { Button } from "./Button";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

type GenreType = {
  genres: GenreResponseProps[];
  currentGenre?: (genre: GenreResponseProps) => void;
};

export function SideBar({ genres, currentGenre = () => {} }: GenreType) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenreId(genre.id);
    currentGenre(genre);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
