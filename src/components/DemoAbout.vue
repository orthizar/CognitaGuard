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
              Cognita Guard verwendet die Google Vision AI, um Gesichter und
              Objekte auf Bildern zu erkennen. Diese KI wurde nicht spezifisch
              trainiert, um gefährliche Objekte und Situationen zu erkennen,
              also werden nicht immer alle Aspekte in den Bildern richtig
              erkannt. Alle erkannten Objekte werden unter dem Resultat als rote
              Boxen in den zwei Bildern angezeigt. Wenn man mit der Maus über
              eine dieser Boxen fährt, können weitere Informationen zum Gesicht
              oder Objekt angezeigt werden. Das Gleiche kann für Mobile mit
              einem Klick erreicht werden.
              <br />
              <br />
              Um den Risikoscore zu berechnen, werden zuerst alle Objekte zu
              einem Gesicht zugewiesen. Die Gefahr von einer Person besteht
              danach aus der berechneten Gefahr von den Emotionen und dem
              gefährlichsten zur Verfügung stehenden Objekt. Falls keine
              Gesichter erkannt werden oder keine gefährlichen Objekte, wird nur
              der andere Faktor verwendet für die Berechnung. Als gesamthafte
              Risikobewertung haben wir dann den Score von der gefährlichsten
              eingestuften Person genommen.
              <br />
              <br />
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
