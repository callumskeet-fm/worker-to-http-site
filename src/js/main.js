const isApp = navigator.userAgent.includes('worker-to-http');

const worker = new Worker('/js/worker.js', { name: 'http-requester' });

worker.onmessage = (event) => {
    const [name, args] = event.data;
    console.log(name, args);
};

worker.postMessage(['do-fetch', { isApp }]);
