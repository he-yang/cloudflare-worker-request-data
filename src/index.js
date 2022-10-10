/**
 *  `RequestData()` function is written to parse user provided data from GET/POST requests in Cloudflare Worker 
 * @author He YANG <he.yang@wtsolutions.cn>
 * @version alpha
 * @license MIT 
 * */

/**
 * Parse user provided data from GET/POST requests in Cloudflare Worker
 * @async
 * @param request Cloudflare Worker Request
 * @returns {(Object|String)} returns (1) a `String` in case of "application/text" or "text/html", or (2) a `Object` in case of "application/json", "application/x-www-form-urlencoded", "mutipart/form-data", or (3) a `String` which is empty if nothing parsed
 */

async function RequestData(request) {
    const { headers } = request;
    const { search } = new URL(request.url)

    if (request.method === "GET") {
        if (!search) return ''
        const queryString = search.slice(1).split('&')
        if (queryString.length < 1) return ''
        const params = {}
        queryString.forEach(item => {
            const kv = item.split('=')
            if (kv[0]) {
                params[kv[0]] = kv[1] || ''
            }
        })
        return params

    } else {//request method = post
        const contentType = headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return await request.json();
            } else if (contentType.includes('application/text')) {
            	return request.text();
            } else if (contentType.includes('text/html')) {
            	return request.text();
        } else if (contentType.includes('form')) {
            const formData = await request.formData();
            const body = {};
            for (const entry of formData.entries()) {
                body[entry[0]] = entry[1];
            }
            return body;
        } else {
            return '';
        }
    }
}
exports.RequestData = RequestData
