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
