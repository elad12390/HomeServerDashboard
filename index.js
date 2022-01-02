

export let configuration = {};
export let links = {};
Array.prototype.asComponent = function(component) { return this.map(i => component(i)).join('') };
Array.prototype.asAsyncComponent = async function(component) {
    const components = await Promise.all(this.map(async i => await component(i)))
    return components.join('');
};
export const fetchStyle = (url) => {
    return new Promise(async (resolve, _) => {
        let style = document.createElement("link");
        style.rel = "stylesheet";
        style.onload = function() { setTimeout(() => resolve(true), 0); };
        style.href = url
        document.querySelector('head').appendChild(style);
    });
}
Object.defineProperty(String.prototype, 'component', {
    get: function() { return this?.replace(/\n+\s+/g, '') }
});
(() => {
    fetch('config.json')
        .then(response => response.json())
        .then(async ({links: l, config}) => {
            // load all configuration before loading app
            configuration = config;
            links = l;

            // load app
            const {App} = await import('./src/App.js')

            // Set title by configuration
            document.querySelector('title').innerHTML= config.PAGE_TITLE

            // Bootstrap into body
            const body = document.querySelector('body')
            body.innerHTML = (await App()).component;
            config.BACKGROUND_COLOR && (body.style.background = config.BACKGROUND_COLOR);
            config.BACKGROUND_IMAGE && (body.style.background = `url(${config.IMAGES_BASE_URL}/${config.BACKGROUND_IMAGE})`);
            config.BACKGROUND_CSS && (body.style.background = config.BACKGROUND_CSS);
        })
})();
