import {Character} from './components/Character/Character.js'
import {IconItem} from "./components/IconItem/IconItem.js";
import {configuration, links} from "../index.js";

export const App = async () => {
    return `
        ${await Character()}
        <div id="icons" style="grid-template-columns:${' 1fr'.repeat(configuration.MAX_ITEMS_IN_ROW)}">
            ${await links.asAsyncComponent(IconItem)}
        </div>`;
}
