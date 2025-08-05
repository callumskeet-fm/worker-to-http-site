const isApp = navigator.userAgent.includes('worker-to-http');

const domMessageLog = document.getElementById('message-log');
const logDOM = (name, args) => {
    const domSection = document.createElement('section');
    const domHeading = document.createElement('h2');
    const domPre = document.createElement('pre');
    const domCode = document.createElement('code');

    domHeading.textContent = name;
    domCode.textContent = JSON.stringify(args);

    domPre.append(domCode);
    domSection.append(domHeading, domPre);
    domMessageLog.append(domSection);
};

const worker = new Worker('/js/worker.js', { name: 'http-requester' });

worker.onmessage = (event) => {
    const [name, args] = event.data;
    console.log(name, args);
    logDOM(name, args);
};

worker.postMessage(['do-fetch', { isApp }]);

const doFetch = async (args) => {
    if (!isApp) {
        logDOM('main-fetch', {
            type: 'not-app',
            message: 'This isn’t the app',
        });
        return;
    }

    try {
        const res = await fetch('http://127.0.0.1:8080/hello');
        const json = await res.json();
        logDOM('main-fetch', { type: 'success', json });
    } catch (error) {
        console.error(error);
        logDOM('main-fetch', { type: 'error', error });
    }
};

doFetch();
