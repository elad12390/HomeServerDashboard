import {configuration, fetchStyle} from '../../../index.js'

let initialized = false
export const IconItem = async ({icon, title, port, route, description, url}) => {
    if (!initialized) {
        initialized = true
        await fetchStyle('/src/components/IconItem/IconItem.css')
    }
    const portUrlPart = port && port !== '' ? `:${port}` : '';
    const routeUrlPart = route && route !== '' ? `/${route}` : '';
    const dataText = description && `data-text="${description}"`
    return `
        <a id="IconItem" href="${url || `http://${window.location.hostname}${portUrlPart}${routeUrlPart}`}" id="link-icon-container" style="text-decoration: none; color: white">
            <div id="link-icon">
                <img id="icon-img" src="${configuration.IMAGES_BASE_URL}/${icon}"/>
            </div>
            <div id="icon-label" class="${configuration.TOOLTIP_SIDE || 'bottom'}" ${dataText}><span>${title}</span></div>
        </a>
    `
};
