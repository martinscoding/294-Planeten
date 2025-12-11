import { useEffect, useState } from "react";
import PlanetCard from "./PlanetCard";

export default function PlanetList() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/planets")
      .then(res => res.json())
      .then(data => setPlanets(data));
  }, []);

  return (
    <div>
      <h1>Planeten Übersicht</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {planets.map(p => (
          <PlanetCard key={p._id} planet={p.content} id={p._id} />
        ))}
      </div>
    </div>
  );
}
