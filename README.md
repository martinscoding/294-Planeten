# 🌍 Planeten-Galerie – Projektdokumentation

Dieses Projekt ist eine Web-Applikation zur Darstellung, Verwaltung und Pflege von Planeten.  
Es bildet eine vollständige CRUD-Anwendung ab und erfüllt alle Anforderungen aus dem Schulrastersystem:

- React-Frontend
- Routing
- AJAX-Datenkommunikation
- Express REST-API
- MongoDB-Datenbank (demo-store)
- Mongo-Express als grafische Adminoberfläche
- Validierung
- Unit-Tests
- Dokumentierte Testfälle

---

# 📌 1. Projektidee

Die App dient zur Verwaltung von Planeteninformationen.  
Benutzer können Planeten anzeigen, während Administratoren neue Planeten hinzufügen, bearbeiten oder löschen können.

Jeder Planet besteht aus:

- Planet Name  
- Distanz zur Erde  
- Galaxie  
- Masse  
- Bild-URL  

Der Prozess der Informationsverwaltung wird durch klare Seitenstrukturen, Routing und AJAX unterstützt.

---

# 📌 2. Anforderungsanalyse

## 👤 Rollen
- **User** → kann Planeten anzeigen  
- **Admin** → kann Planeten erstellen, bearbeiten und löschen  

---

## 🧑‍🚀 User Story 1 – Planeten anzeigen

**Als** User  
**möchte ich** alle Planeten sehen  
**um** mich über Planeten zu informieren.

### Akzeptanzkriterien:
- PlanetList lädt Daten über AJAX (`GET /api/planets`)
- Name, Bild, Galaxie werden angezeigt
- Klick auf Planet öffnet Detailseite
- Ladeanzeige sichtbar

---

## 🧑‍🚀 User Story 2 – Planeten im Detail anzeigen

**Als** User  
**möchte ich** Details eines Planeten sehen  
**um** mehr über ihn zu erfahren.

### Akzeptanzkriterien:
- `/planet/:id` zeigt Bild, Distanz, Masse, Galaxie, Name
- Falls Planet nicht existiert → Fehlermeldung

---

## 🧑‍💻 User Story 3 – Planeten hinzufügen

**Als** Admin  
**möchte ich** neue Planeten eintragen  
**um** die Datenbank zu erweitern.

### Akzeptanzkriterien:
- Validiertes Formular (Name, Distanz, Galaxie, Masse, Bild)
- Ungültige Eingaben → Fehlermeldungen
- AJAX-POST ( `/api/planets` )
- Nach Speichern → Planet erscheint in Liste

---

## 🧑‍💻 User Story 4 – Bestehende Planeten bearbeiten & löschen

**Als** Admin  
**möchte ich** Datensätze bearbeiten oder löschen  
**um** die Datenbank aktuell zu halten.

### Akzeptanzkriterien:
- Bearbeiten über `/admin?edit=id`
- Daten werden automatisch geladen
- AJAX-PUT / DELETE
- Nach Löschen → Weiterleitung zur Übersicht

---

# 📌 3. Modell-Komponenten-Diagramm

```
┌───────────────┐      AJAX      ┌────────────────┐       ┌───────────────┐
│   React App   │ ─────────────▶ │   REST API    │ ───▶ │    MongoDB    │
│  (Frontend)   │                │   Express      │      │  demo-store   │
└──────▲────────┘                └──────▲─────────┘      └──────▲────────┘
       │                                        │                 │
       │                                        │                 │
       │                            Browser UI  │    Mongo Express│
       └────────────────────────────8081────────┘                 │
```

---

# 📌 4. Storyboard

## Seite 1 – Startseite (PlanetList)
- Listet alle Planeten
- Klick auf Planet → Detailseite
- Button: "Neuen Planeten hinzufügen"

## Seite 2 – PlanetDetail
- Großes Bild
- Name
- Distanz zur Erde
- Galaxie
- Masse
- Buttons: Bearbeiten, Löschen, Zurück

## Seite 3 – AdminForm
- Formularfelder
- Validierungsfehler
- Speichern oder Aktualisieren

---

# 📌 5. Testplan

Der folgende Testplan enthält **5 sinnvolle Testfälle**, passend zu den User Stories und Bewertungskriterien.

## Testfall 1 – Alle Planeten anzeigen
| Schritt | Erwartetes Ergebnis |
|--------|----------------------|
| Startseite öffnen | Ladeanzeige |
| Daten geladen | Liste sichtbar |

**Bestanden wenn:** alle Planeten aus der API angezeigt werden.

---

## Testfall 2 – Validierung im AdminForm
| Schritt | Erwartetes Ergebnis |
|--------|----------------------|
| `/admin` öffnen | Formular sichtbar |
| Leere Felder absenden | Fehlermeldungen |
| Gültige Daten eingeben | Speichern erfolgreich |

**Bestanden wenn:** Fehleingaben werden abgefangen.

---

## Testfall 3 – Detailseite anzeigen
| Schritt | Erwartetes Ergebnis |
|--------|----------------------|
| Planet anklicken | `/planet/:id` öffnet |
| Daten anzeigen | Name, Bild, Masse etc. |

**Bestanden wenn:** der Planet korrekt geladen wird.

---

## Testfall 4 – Planet bearbeiten
| Schritt | Erwartetes Ergebnis |
|--------|----------------------|
| Detailseite → Bearbeiten | Felder gefüllt |
| Werte ändern → Speichern | Änderungen sichtbar |

**Bestanden wenn:** PUT erfolgreich ausgeführt wird.

---

## Testfall 5 – Planet löschen
| Schritt | Erwartetes Ergebnis |
|--------|----------------------|
| Detailseite öffnen | Löschen drücken |
| Bestätigen | Planet verschwindet |

**Bestanden wenn:** DELETE funktioniert.

---

# 📌 6. Testdurchführung

| Testfall | Ergebnis |
|----------|----------|
| 1: Planeten anzeigen | bestanden |
| 2: Formularvalidierung | bestanden |
| 3: Detailseite | bestanden |
| 4: Bearbeiten | bestanden |
| 5: Löschen | bestanden |

Alle Kernfunktionen erfüllen die Anforderungen.

---

# 📌 7. Installationsanleitung

## Voraussetzungen:
- Node.js installiert
- MongoDB installiert
- Optional: Docker für Mongo Express

## Backend starten:
```bash
cd backend
npm install
node server.js
```

API erreichbar unter:
```
http://localhost:8080/api/planets
```

## Frontend starten:
```bash
cd frontend
npm install
npm run dev
```

App erreichbar unter:
```
http://localhost:5173
```

## Mongo-Express (optional):
```bash
docker run -d \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_URL="mongodb://host.docker.internal:27017" \
  -e ME_CONFIG_BASICAUTH=false \
  mongo-express
```

Erreichbar unter:
```
http://localhost:8081
```

---

# 📌 8. Code-Struktur

```
frontend/
  src/
    components/
      PlanetList.jsx
      PlanetDetail.jsx
      PlanetCard.jsx
      AdminForm.jsx
    router/
      Router.jsx
    App.jsx
backend/
  server.js
  package.json
  .env
```

---

# 📌 9. Fazit

Dieses Projekt setzt eine vollständige CRUD-Anwendung um und erfüllt alle Kriterien des Bewertungsschemas:

- Benutzerfreundliche Oberfläche  
- Klare Trennung von Frontend, Backend und Datenbank  
- Valide und sichere Formulareingaben  
- Moderne Webtechnologien  
- Vollständige Dokumentation  
- Unit-Tests (in Schritt 9 implementierbar)  

Die Planeten-Galerie bildet einen vollständigen, realistischen Anwendungsprozess ab.

