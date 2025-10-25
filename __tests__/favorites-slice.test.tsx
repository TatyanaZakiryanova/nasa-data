import favoritesSlice, {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '@/app/redux/favorites/favoritesSlice';
import { FavoritePhoto } from '@/app/redux/favorites/types';

describe('favoritesSlice', () => {
  const initialState = { items: [] as FavoritePhoto[] };
  const photo = {
    id: 'photo1',
    title: 'Test Photo',
    imageUrl: 'test.jpg',
    date: '2024-02-12',
    description: 'desc',
  };

  it('sets favorites', () => {
    const newState = favoritesSlice(initialState, setFavorites([photo]));
    expect(newState.items).toEqual([photo]);
  });

  it('adds photo to favorites', () => {
    const newState = favoritesSlice(initialState, addToFavorites(photo));
    expect(newState.items).toContainEqual(photo);
  });

  it('removes photo from favorites', () => {
    const newState = favoritesSlice({ items: [photo] }, removeFromFavorites('photo1'));
    expect(newState.items).toEqual([]);
  });
});
