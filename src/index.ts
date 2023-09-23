export interface Env {
	SHORT: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const short = url.pathname.split('/')[1];
		if (short === '') {
			return new Response('Not found', { status: 404 });
		}
		const redirect = await env.SHORT.get(short.toUpperCase());
		if (redirect === null) {
			return new Response('Not found', { status: 404 });
		}
		return Response.redirect(redirect, 301);
	},
};
