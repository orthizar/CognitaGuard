<template>
  <section>
    <div
      class="flex min-h-screen py-12 mx-4 xl:py-32 xl:gap-2 xl:mx-auto xl:grid xl:grid-cols-12 max-w-[100rem]"
    >
      <article
        class="relative w-full max-w-lg col-span-8 col-start-3 mx-auto xl:max-w-none"
      >
        <div
          class="hidden xl:block w-[11rem] left-[-2rem] bottom-[0rem] shape"
        ></div>

        <div
          class="relative flex flex-col justify-between h-full px-5 pt-6 xl:p-10 xl:pb-12 pb-9 bg-gray-dark bg-opacity-90 rounded-2xl"
        >
          <div>
            <h2 class="font-normal">Über das Projekt</h2>
            <p class="mt-4">
              Cognita Guard verwendet die Google Vision AI, um Gesichter,
              Emotionen und Objekte in Bildern zu erkennen. Die Google Vision AI
              ist limitiert, da ihr Modell nicht darauf trainiert wurde,
              gefährliche Situationen oder Gegenstände zu erkennen.
              <br /><br />
              Zur Nachvollziehbarkeit werden alle erkannten Objekte und Personen
              unter dem Resultat als rote Boxen in den zwei Bildern angezeigt.
              Mittels der Maus kann man über eine der Boxen fahren oder auf dem
              Smartphone auf die Box klicken, um erweiterte Informationen über
              zum Beispiel die Emotionen einer Person zu erhalten.
              <br />
              Für die Berechnung des Risikoscore werden nur Objekte
              berücksichtigt, welche zu einer Person zugewiesen werden können.
              Die Gefahr einer einzelnen Person wird im Anschluss aus der Gefahr
              der Emotionen und allen Gefahren der Objekte dieser Person
              errechnet. Der Gesamt-Risikoscore wird anschliessend anhand der
              gefährlichsten Person definiert. Sollte keine Person im Bild
              gefunden werden, wird der Gesamt-Risikoscore anhand des
              gefährlichsten Gegenstandes definiert.
              <br /><br />
              Die Gefahr von einem Gesicht wird anhand der Wahrscheinlichkeiten
              der Emotionen berechnet. Wut, Kummer oder Kopfbedeckungen
              verursachen einen höheren Score, wobei Freude die
              Gefahreneinstufung senken kann. Für Objekte wird der Name des
              Objekts bewertet. So ergeben Messer und Hammer einen hohen
              Risikoscore und Kleidung eine Bewertung von 0 %.
            </p>
          </div>
          <button
            class="!w-full xl:!w-48 mx-auto justify-self-end mt-8 btn btn--primary"
            @click="emit('content')"
          >
            Jetzt versuchen
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(["content"]);
</script>
