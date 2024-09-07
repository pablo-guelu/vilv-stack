<template>
  <v-sheet
    id="home"
    class="d-flex justify-center align-center text-center flex-column"
    color="primary"
    min-height="600"
  >
    <div class="text-h3 font-weight-medium mb-5">
      Welcome To Landing Page Free
    </div>

    <div class="text-h6 font-weight-light mb-5" style="max-width: 468px;">
      Exceptru sentum occaecat cupidatat nonet proident, vante nislat
      quistamused officituames ets deserunt etimus nets.
    </div>

    <div class="d-flex ga-5 flex-1-1-auto flex-wrap justify-center px-4">
      <v-text-field
        flat
        hide-details
        label="Enter Your Email Address"
        rounded
        single-line
        style="min-width: 300px;"
        variant="solo"
      />

      <v-btn
        :block="$vuetify.display.mdAndDown"
        color="accent"
        flat
        height="55"
        rounded
        text="GET STARTED"
      />
    </div>
  </v-sheet>
</template>
