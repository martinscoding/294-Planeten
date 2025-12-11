export default function PlanetCard({ planet }) {
  return (
    <div className="planet-card">
      <img src={planet.imageUrl} alt={planet.planetName} />
      <h3>{planet.planetName}</h3>
    </div>
  );
}
