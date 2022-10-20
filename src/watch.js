import onChange from 'on-change';
import renderState from './render';

const watch = (state) => onChange(state, (path, value) =>{
    console.log(path)
    console.log(value)
    if (path === posts) {
        renderState()
    }
})
export default watch;