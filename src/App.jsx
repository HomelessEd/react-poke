import {useState, useEffect} from 'react'
import './App.css';

function App () {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!searchTerm){
      setPokemon(null);
      setError(null);
      setLoading(false);
      return;
    }
    const fetchPokemon =async () => {
      setLoading(true);
      setError(null);

      try {
         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

      if (!response.ok){
          throw new Error ('Pokemon not found');
        }const data = await response.json();
      setPokemon(data); 
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPokemon();
}, [searchTerm]);
      
    
  

  return (
  <div className="App">
    <h1>Who´s that Pokemon?</h1>
    <form onSubmit={(e) => e.preventDefault()}>
    <input
      type= "text"
      placeholder='Find Pokemon'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
     />
    
   </form>
  
  <p>Searching for: {searchTerm}</p>
  {loading && <p>Searching...</p>}

    
      {error && <p style={{ color: 'red' }}>{error}</p>}

    
      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            style={{ width: '150px' }}
          />
          <p>Height: {pokemon.height *10} cm</p>
          <p>Weight: {pokemon.weight /10} kg</p>
          <p>Base Experience: {pokemon.base_experience}</p>
          <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>

  </div>
    )}
  </div>
  );
};

export default App;