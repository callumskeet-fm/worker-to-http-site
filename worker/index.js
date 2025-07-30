import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint {
    async fetch(request) {
        return await this.env.ASSETS.fetch(request);
    }
}
