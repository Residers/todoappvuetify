<template>
  <div class="home">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <v-row v-else>
      <v-col cols="3" v-for="(elem, i) in notes" :key="i">
        <v-card class="mx-auto" max-width="300" tile :color="elem.color">
          <v-card-text>
            <v-text-field label="Note title" v-model="elem.title" />
            <v-row v-for="(note, i) in elem.items" :key="i">
              <v-checkbox v-model="note.check" @click="checkTrue(elem)" />

              <v-text-field v-model="note.name" class="ml-3" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/admin";
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState({
      isLoading: (state) => state.admin.isLoading,
      error: (state) => state.admin.error,
      notes: (state) => state.admin.data,
    }),
  },
  data() {
    return {
      selectedItem: 0,
      ex4: false,
    };
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed);
  },
  methods: {
    checkTrue(note) {
      console.log("note", note);
      let lengthTrue = note.items.filter((elem) => elem.check).length;
      console.log("lengthTrue", lengthTrue);
      if (note.items.length === lengthTrue) note.color = "#6b7070";
    },
  },
};
</script>
