import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PlanetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/planets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Planet nicht gefunden");
        return res.json();
      })
      .then((data) => setPlanet(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const deletePlanet = async () => {
    if (!confirm("Willst du diesen Planeten wirklich löschen?")) return;

    const res = await fetch(`http://localhost:8080/api/planets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Planet gelöscht!");
      navigate("/");
    } else {
      alert("Fehler beim Löschen.");
    }
  };

  if (loading) return <p>Lade Planet...</p>;
  if (error) return <p>{error}</p>;
  if (!planet) return <p>Planet existiert nicht.</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Zurück</button>

      <h1>{planet.planetName}</h1>

      <img src={planet.imageUrl} alt={planet.planetName} width="300" />

      <p>Distanz zur Erde: {planet.distanceToEarth}</p>
      <p>Galaxie: {planet.galaxy}</p>
      <p>Masse: {planet.mass}</p>

      <button onClick={() => navigate(`/admin?edit=${id}`)}>
        Bearbeiten
      </button>

      <button onClick={deletePlanet}>
        Löschen
      </button>
    </div>
  );
}
