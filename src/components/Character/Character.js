import {configuration, fetchStyle} from '../../../index.js'
let initialized = false
export const Character = async () => {
    if (!initialized) {
        initialized = true
        await fetchStyle('/src/components/Character/Character.css')
    }
    return `<img id="character" src="${configuration.IMAGES_BASE_URL}/Satoru_Gojo.png"/>`
};
