# Werke zur Galerie hinzufügen

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
- `themen`: Eine oder mehrere Themen aus `Akt`, `Tiere`, `Ruhrpott`, `Blumen`, `Porträts`, `Abstrakt` und `Natur`. Neue Themen werden ebenfalls automatisch als Filter und Themenkarte angezeigt.
- `material`: Zum Beispiel `Öl`, `Acryl`, `Bleistift`, `Aquarell` oder `Mischtechnik`. Neue Materialien erscheinen ebenfalls automatisch als Filter.
- `jahr`, `groesse` und `preis` sind optional.
- `format`: `hochkant`, `querformat`, `quadratisch` oder `rund`. Bei normalen Fotos richtet sich die Darstellung ansonsten nach dem Bildformat.

Zwischen zwei Werk-Einträgen steht ein Komma. Hinter dem letzten Eintrag darf kein Komma stehen. Die Anführungszeichen müssen normale doppelte JSON-Anführungszeichen sein.

## Vorschau auf dem eigenen Rechner

Die Galerie lädt `werke.json` nach, deshalb funktioniert die Vorschau nicht zuverlässig, wenn `index.html` direkt per Doppelklick geöffnet wird. Starte stattdessen im Projektordner einen lokalen Webserver, zum Beispiel mit Python:

```powershell
py -m http.server 8000
```

Öffne anschließend `http://localhost:8000` im Browser. Zum Beenden des Servers im Terminal `Strg+C` drücken. Auf einem Webserver wird `werke.json` automatisch mitgeladen.
