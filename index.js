

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

            // Bootstrap into body
            document.querySelector('body').innerHTML = (await App()).component;
            console.log((await App()).component);
        })
})();
