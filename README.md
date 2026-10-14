# Hundpensionat-Tassen

En responsiv webbplats för hundpensionat Tassen.

# Funktioner

- Information om verksamheten
- Aktuellt väder via Open-Meteo
- Öppet/Stängt-status som uppdateras automatiskt
- Kundomdömen
- Tjänstelistan med priser
- Bokningssystem med localStorage
- Avbokning av bokningar
- Scroll-to-top knapp
- Mobilanpassad design

# Tekniker

- HTML
- CSS
- JavaScript
- LocalStorage
- Open-Meteo API

# Vad var svårast/vad lärde jag mig

Jag hade två element med id="datum".
När bokningssystemet skulle hämta datumet fick jag undefined.
Jag felsökte med console.log() i submit-funktionen och upptäckte att datumvärdet inte lästes in.
Lösningen var att byta input-fältets id till bokningsDatum och uppdatera JavaScript-koden.

# Skapad av:

Alexander Nordling - Student Nackademin