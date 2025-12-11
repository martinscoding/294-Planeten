import { useNavigate } from "react-router-dom";

export default function PlanetCard({ planet, id }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/planet/${id}`)}>
      <h2>{planet.planetName}</h2>
      <img src={planet.imageUrl} alt={planet.planetName} width="150" />
      <p>{planet.galaxy}</p>
    </div>
  );
}
