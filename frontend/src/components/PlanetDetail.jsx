import { useParams } from "react-router-dom";

export default function PlanetDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Planet Detail – {id}</h1>
      {/* AJAX-Detailabfrage kommt später */}
    </div>
  );
}
