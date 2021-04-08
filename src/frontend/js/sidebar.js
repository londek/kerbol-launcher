import { steamIconHTML } from './common.js';

export const noInstances = document.getElementById('no-instances');
export const instanceScroller = document.getElementById('instance-scroller');

export function showNoInstances() {
    noInstances.style.display = 'block';
}

export function hideNoInstances() {
    noInstances.style.display = 'block';
}

export function createInstance(id, distro, version) {
    if(getInstance(id)) return console.error(`${formatId(id)} already exists`);

    const scrollerInstance = document.createElement('div');
    scrollerInstance.id = formatId(id);
    scrollerInstance.innerHTML = `<div id="instance-item"><span class="instance-span unselectable-text">${distro === 'steam' ? steamIconHTML : distro} ${version}</span></div><hr id="instance-separator">`;

    instanceScroller.insertBefore(scrollerInstance, noInstances);
}

export function removeInstance(id) {

}

export function getInstance(id) {
    return document.getElementById(formatId(id));
}

export function formatId(id) {
    return `scroller-instance-${id}`;
}