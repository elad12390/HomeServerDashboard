import {configuration, fetchStyle} from '../../../index.js'

let initialized = false
export const IconItem = async ({file, title, port}) => {
    if (!initialized) {
        initialized = true
        await fetchStyle('/src/components/IconItem/IconItem.css')
    }
    return `
        <a id="IconItem" href="http://${window.location.hostname}:${port}" id="link-icon-container" style="text-decoration: none; color: white">
            <div id="link-icon">
                <img id="icon-img" src="${configuration.IMAGES_BASE_URL}/${file}"/>
            </div>
            <div id="icon-label"><span>${title}</span></div>
        </a>
    `
};
