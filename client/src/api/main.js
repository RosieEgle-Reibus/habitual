import axios from 'axios'


const getAllHabits =() => {
    return axios.get('/api/habit')
        .then(res => res.data)
}

export {
    getAllHabits
}