# Werke und Kategorien der Galerie bearbeiten

## Kategorien konfigurieren

Öffne `kategorien.json`. Jede Kategorie hat einen Namen und den Pfad zu einem Bild im Projektordner:

```json
[
  { "name": "Tiere", "bild": "bilder/Der_Ara.jpg" },
  { "name": "Ruhrpott", "bild": "bilder/Bergmann.jpg" }
]
```

Passe `name` und `bild` an oder füge weitere Einträge hinzu. Das Bild wird als Hintergrund der Kategorie-Karte verwendet. Lege neue Bilder in `bilder` ab. Wenn `bild` leer bleibt oder fehlt, erscheint die Karte ohne Bild. Verwende für die Anführungszeichen normale doppelte JSON-Anführungszeichen und trenne Einträge mit Kommas.

## 1. Bild ablegen

Speichere das Bild im Ordner `bilder`. Verwende am besten einen kurzen Dateinamen ohne Leerzeichen, zum Beispiel `morgenrot-im-revier.jpg`.

## 2. Werk in `werke.json` eintragen

Öffne `werke.json` mit einem Texteditor. Kopiere einen vorhandenen Werk-Eintrag und passe die Angaben an:

```json
{
  "title": "Morgenrot im Revier",
  "bild": "bilder/morgenrot-im-revier.jpg",
  "themen": ["Ruhrpott", "Natur"],
  "material": "Acryl",
  "jahr": 2025,
  "groesse": "50 × 70 cm",
  "preis": "320 €",
  "format": "hochkant"
}
```

- `bild`: Pfad zur Bilddatei. Ohne Bildpfad zeigt die Website eine Beispielillustration.
- `themen`: Eine oder mehrere Kategorien aus `kategorien.json`. Schreibweise und Name müssen übereinstimmen. Kategorien werden dort verwaltet und erscheinen als Filter und Themenkarte.
- `material`: Zum Beispiel `Öl`, `Acryl`, `Bleistift`, `Aquarell` oder `Mischtechnik`. Neue Materialien erscheinen ebenfalls automatisch als Filter.
- `jahr`, `groesse` und `preis` sind optional.
- `format`: `hochkant`, `querformat`, `quadratisch` oder `rund`. Bei normalen Fotos richtet sich die Darstellung ansonsten nach dem Bildformat.

Zwischen zwei Werk-Einträgen steht ein Komma. Hinter dem letzten Eintrag darf kein Komma stehen. Die Anführungszeichen müssen normale doppelte JSON-Anführungszeichen sein.

## Vorschau auf dem eigenen Rechner

Die Galerie lädt `werke.json` nach, deshalb funktioniert die Vorschau nicht zuverlässig, wenn `index.html` direkt per Doppelklick geöffnet wird. Starte stattdessen im Projektordner einen lokalen Webserver, zum Beispiel mit Python:

```powershell
py -m http.server 8000
```

Öffne anschließend `http://localhost:8000` im Browser. Zum Beenden des Servers im Terminal `Strg+C` drücken. Die Galerie lädt `werke.json` und `kategorien.json` automatisch mit.
