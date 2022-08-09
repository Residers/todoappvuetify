const SLEEP_TIME = 1000
function sleep(box) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(box)
        }, SLEEP_TIME)
    })
}
const notes = [
    {
        title: 'Note 1',
        id: 0,
        color: '',
        items: [
            { name: 'Make food', check: false },
            { name: 'clean floor', check: false },
            { name: 'eat', check: false },
        ]
    },
    {
        title: 'Note 2',
        id: 1,
        color: '',
        items: [
            { name: 'Make food', check: false },
            { name: 'clean ', check: false },
            { name: 'work', check: false },
        ]
    },
    {
        title: 'Note 3',
        id: 2,
        color: '',
        items: [
            { name: 'Make food', check: false },
            { name: 'run', check: false },
            { name: 'play', check: false },
        ]
    },
]

const notesApi = {
    getNotes() {
        return sleep(notes)
    },
    createNote(item) {
        return new Promise((resolve, reject) => {
            if (!item) reject('Не удалось создать заметку!')
            else {
                notes.push(item)
                console.log('notes', notes);
                resolve('done')
            }

        })

    },
    editNote(item) {
        return new Promise((resolve, reject) => {
            if (!item) reject('Не удалось отредактировать заметку!')
            else {
                const ind = notes.findIndex(elem => elem.id === item.id)
                notes.splice(ind, 1, item)
                resolve('done')
            }
        })
    },
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            const ind = notes.findIndex(elem => elem.id === id)
            if (ind === -1) reject('Не удалось удалить заметку!')
            else {
                notes.splice(ind, 1)
                resolve('done')
            }
        })
    }
}
export default notesApi