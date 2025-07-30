const doFetch = async (args) => {
    if (!args.isApp) {
        self.postMessage([
            'do-fetch',
            { type: 'not-app', message: 'This isn’t the app' },
        ]);
        return;
    }

    try {
        const res = await fetch('http://127.0.0.1:8080/hello');
        const json = await res.json();
        self.postMessage(['do-fetch', { type: 'success', json }]);
    } catch (error) {
        console.log(error);
        self.postMessage(['do-fetch', { type: 'error', error }]);
    }
};

self.onmessage = ({ data: [name, args] }) => {
    if (name === 'do-fetch') {
        doFetch(args);
    }
};
