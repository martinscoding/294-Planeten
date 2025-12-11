import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanetCard from "./PlanetCard";

export default function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Lade Planeten...</p>;

  return (
    <div>
      <h1>Planeten</h1>

      {planets.length === 0 && <p>Keine Planeten vorhanden.</p>}

      {planets.map((p) => (
        <PlanetCard
          key={p._id}
          id={p._id}
          planet={p.content}
        />
      ))}

      <button onClick={() => navigate("/admin")}>
        Neuen Planeten hinzufügen
      </button>
    </div>
  );
}
