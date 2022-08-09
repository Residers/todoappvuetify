import notesApi from '/api/notes.js'

const state = {
    data: null,
    isLoading: false,
    error: null,

    errorCN: null,
    errorEN: null,
    errorDN: null,
}

export const mutationTypes = {
    getFeedStart: '[admin] Get feed start',
    getFeedSuccess: '[admin] Get feed success',
    getFeedFailure: '[admin] Get feed failure',
    createNoteFailure: '[admin] Create note failure',
    editNoteFailure: '[admin] Edit note failure',
    deleteNoteFailure: '[admin] Delete note failure',
}
export const actionTypes = {
    getFeed: '[admin] Get feed',
    createNote: '[admin] Create note',
    editNote: '[admin] Edit note',
    deleteNote: '[admin] Delete note',
}

const mutations = {
    [mutationTypes.getFeedStart](state) {
        state.isLoading = true
        state.data = null
        state.error = null
    },
    [mutationTypes.getFeedSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getFeedFailure](state, payload) {
        state.isLoading = false
        state.error = payload
    },
    [mutationTypes.createNoteFailure](payload) { state.errorCN = payload },
    [mutationTypes.editNoteFailure](payload) { state.errorEN = payload },
    [mutationTypes.deleteNoteFailure](payload) { state.errorDN = payload },

}

const actions = {
    async [actionTypes.getFeed](context) {
        context.commit(mutationTypes.getFeedStart)
        await notesApi.getNotes().then(response => {
            context.commit(mutationTypes.getFeedSuccess, response)
        })
            .catch(() => { context.commit(mutationTypes.getFeedFailure, 'Не удалось загрузить данные!') })
    },
    async [actionTypes.createNote](context, item) {
        await notesApi.createNote(item)
            .catch((err) => { context.commit(mutationTypes.createNoteFailure, err) })
    },
    async [actionTypes.editNote](context, item) {
        await notesApi.editNote(item)
            .catch((err) => { context.commit(mutationTypes.editNoteFailure, err) })
    },
    async [actionTypes.deleteNote](context, id) {
        await notesApi.deleteNote(id)
            .catch((err) => { context.commit(mutationTypes.deleteNoteFailure, err) })
    },

}

export default {
    state,
    mutations,
    actions
}