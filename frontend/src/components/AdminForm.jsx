import { useState } from "react";

export default function AdminForm() {
  const [planetName, setPlanetName] = useState("");
  const [distance, setDistance] = useState("");
  const [galaxy, setGalaxy] = useState("");
  const [mass, setMass] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlanet = {
      content: {
        planetName,
        distanceToEarth: Number(distance),
        galaxy,
        mass: Number(mass),
        imageUrl,
      },
    };

    const res = await fetch("http://localhost:8080/api/planets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlanet),
    });

    if (res.ok) {
      alert("Planet erfolgreich gespeichert!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Neuen Planeten hinzufügen</h1>

      <input
        placeholder="Planet Name"
        value={planetName}
        onChange={(e) => setPlanetName(e.target.value)}
      />

      <input
        placeholder="Distanz zur Erde"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />

      <input
        placeholder="Galaxie"
        value={galaxy}
        onChange={(e) => setGalaxy(e.target.value)}
      />

      <input
        placeholder="Masse"
        type="number"
        value={mass}
        onChange={(e) => setMass(e.target.value)}
      />

      <input
        placeholder="Bild-URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit">Speichern</button>
    </form>
  );
}
