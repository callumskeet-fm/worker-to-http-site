const doFetch = async (args) => {
    if (!args.isApp) {
        self.postMessage([
            'worker-fetch',
            { type: 'not-app', message: 'This isn’t the app' },
        ]);
        return;
    }

    try {
        const res = await fetch('http://127.0.0.1:8080/hello');
        const json = await res.json();
        self.postMessage(['worker-fetch', { type: 'success', json }]);
    } catch (error) {
        console.error(error);
        self.postMessage(['worker-fetch', { type: 'error', error }]);
    }
};

self.onmessage = ({ data: [name, args] }) => {
    if (name === 'worker-fetch') {
        doFetch(args);
    }
};
