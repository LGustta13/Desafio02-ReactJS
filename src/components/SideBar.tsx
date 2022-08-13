import {useState, useEffect} from 'react';
import {Button} from "./Button";
import { api } from '../services/api';

type GenreResponseProps = {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string 
}

type SideBarProps = {
  handleClickButton: (id:number) => void // Função anõmima, parâmetros id e retorna nada
  selectedGenreId: number
}

// desemembra os parâmetros
export function SideBar(props : SideBarProps ) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}