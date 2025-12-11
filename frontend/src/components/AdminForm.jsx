import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdminForm() {
  const [planetName, setPlanetName] = useState("");
  const [distance, setDistance] = useState("");
  const [galaxy, setGalaxy] = useState("");
  const [mass, setMass] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("edit");

  useEffect(() => {
    if (editId) {
      fetch(`http://localhost:8080/api/planets/${editId}`)
        .then((res) => res.json())
        .then((data) => {
          const p = data.content;
          setPlanetName(p.planetName);
          setDistance(p.distanceToEarth);
          setGalaxy(p.galaxy);
          setMass(p.mass);
          setImageUrl(p.imageUrl);
        });
    }
  }, [editId]);

  const validate = () => {
    const newErrors = {};
    if (!planetName.trim()) newErrors.planetName = "Name darf nicht leer sein";
    if (!distance || Number(distance) <= 0)
      newErrors.distance = "Distanz muss > 0 sein";
    if (!galaxy.trim()) newErrors.galaxy = "Galaxie darf nicht leer sein";
    if (!mass || Number(mass) <= 0) newErrors.mass = "Masse muss > 0 sein";
    if (!imageUrl.trim()) newErrors.imageUrl = "Bild-URL darf nicht leer sein";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const planetData = {
      content: {
        planetName,
        distanceToEarth: Number(distance),
        galaxy,
        mass: Number(mass),
        imageUrl,
      },
    };

    if (editId) {
      await fetch(`http://localhost:8080/api/planets/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planetData),
      });
      alert("Planet aktualisiert");
    } else {
      await fetch("http://localhost:8080/api/planets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planetData),
      });
      alert("Planet gespeichert");
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{editId ? "Planet bearbeiten" : "Neuen Planeten hinzufügen"}</h1>

      <input
        value={planetName}
        onChange={(e) => setPlanetName(e.target.value)}
        placeholder="Planet Name"
      />
      {errors.planetName && <p>{errors.planetName}</p>}

      <input
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Distanz zur Erde"
        type="number"
      />
      {errors.distance && <p>{errors.distance}</p>}

      <input
        value={galaxy}
        onChange={(e) => setGalaxy(e.target.value)}
        placeholder="Galaxie"
      />
      {errors.galaxy && <p>{errors.galaxy}</p>}

      <input
        value={mass}
        onChange={(e) => setMass(e.target.value)}
        placeholder="Masse"
        type="number"
      />
      {errors.mass && <p>{errors.mass}</p>}

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Bild-URL"
      />
      {errors.imageUrl && <p>{errors.imageUrl}</p>}

      <button type="submit">
        {editId ? "Aktualisieren" : "Speichern"}
      </button>
    </form>
  );
}
