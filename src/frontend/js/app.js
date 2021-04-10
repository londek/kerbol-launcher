import { hideNoInstances, showNoInstances } from './sidebar.js';

document.addEventListener)

console.log('%cWAIT', 'font-size:30px; color:red;');
console.log('If you dont know what are you doing, please close this window.');
console.log('If you know what are you doing, please consider contributing! Thanks');

console.log('%cKerbolLauncher renderer main has loaded', 'color:lime;');

const gameInstances = await kerbolAPI.configManager.fetchGameInstances();
if(Object.keys(gameInstances).length === 0) {
    showNoInstances();
    showQuickstartOverlay();
    document.getElementById('quickstart-path-file-btn').onclick = async () => { 
        const { canceled, filePaths } = await kerbolAPI.fileManager.openFileDialog([{name: 'buildID files', extensions: ['txt']}]);
        if(canceled || filePaths.length == 0) {
            return;
        }

        document.getElementById('quickstart-path-input').value = filePaths[0];
    };

    document.getElementById('quickstart-ready-btn').onclick = async () => {
        document.getElementById('quickstart-ready-btn').disabled = true;
        const { error, reason } = await kerbolAPI.configManager.storeGameInstance({ label: "beta-instance", distro: null, buildId: document.getElementById('quickstart-path-input').value });
        if(error) {
            document.getElementById('quickstart-error').innerText = reason;
            document.getElementById('quickstart-ready-btn').disabled = false;
            return;
        }
        hideQuickstartOverlay();
        hideNoInstances();
        document.getElementById('quickstart-ready-btn').disabled = false;
    };
}

function showQuickstartOverlay() {
    document.getElementById('quickstart-overlay').classList.add('active');
}

function hideQuickstartOverlay() {
    document.getElementById('quickstart-overlay').classList.remove('active');
}