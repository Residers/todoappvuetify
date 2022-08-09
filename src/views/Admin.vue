<template>
  <div class="admin">
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="300" tile>
          <v-card-text>
            <div v-if="isLoading">Loading...</div>
            <div v-else-if="error">{{ error }}</div>
            <v-list dense v-else>
              <v-subheader>Notes</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(notion, i) in notes" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="notion.title">
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="openCreator()">Create</v-btn>
            <v-btn @click="openEditor()">Edit</v-btn>
            <v-btn @click="deleteNote()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="mx-auto" max-width="300" tile v-if="creator">
          <v-card-text>
            <v-text-field label="Note title" v-model="item.title" />
            <v-list dense>
              <v-subheader>Notes content</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(note, i) in item.items" :key="i">
                  <v-list-item-content>
                    <v-text-field label="New note" v-model="note.name" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-btn @click="addNote(item.items)">Add note</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="createNote()">Create note</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto" max-width="300" tile v-else-if="editor">
          <v-card-text>
            <v-text-field label="Note title" v-model="editorItem.title" />
            <v-list dense>
              <v-subheader>Notes content</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(note, i) in editorItem.items" :key="i">
                  <v-list-item-content>
                    <v-text-field label="New note" v-model="note.name" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-btn @click="addNote(editorItem.items)">Add note</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="editNote()">Edit note</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { actionTypes } from "@/store/modules/admin";
import { mapState } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      item: { title: "", id: 0, items: [{ name: "", check: false }] },
      selectedItem: 0,
      creator: false,
      editor: false,
      editorItem: null,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.admin.isLoading,
      error: (state) => state.admin.error,
      notes: (state) => state.admin.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed);
  },
  methods: {
    addNote(items) {
      items.push({ name: "", check: false });
    },
    createNote() {
      const ind = this.notes.length;
      this.item.id = ind;
      this.$store.dispatch(actionTypes.createNote, this.item);
      this.item = { title: "", id: 0, items: [{ name: "", check: false }] };
      this.creator = false;
    },
    editNote() {
      this.$store.dispatch(actionTypes.editNote, this.editorItem);
      this.editorItem = null;
      this.editor = false;
    },
    deleteNote() {
      const agree = window.confirm("Are ure sure?");
      if (agree) {
        const id = this.notes[this.selectedItem].id;
        this.$store.dispatch(actionTypes.deleteNote, id);
      }
    },
    openCreator() {
      this.creator = true;
    },
    openEditor() {
      this.editorItem = this.notes[this.selectedItem];
      this.editor = true;
    },
  },
  watch: {
    selectedItem(val) {
      if (!val) {
        this.selectedItem = 0;
      }
    },
  },
};
</script>
