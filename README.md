# cloudflare-worker-request-data
RequestData() function is written to parse user provided data from GET/POST requests in Cloudflare Worker

## Example

``` javascript
import { RequestData } from 'cloudflare-worker-request-data';

export default {
	async fetch(request, env, ctx) {

        const data = await RequestData(request)
        
        // do something with the data
			

	}
};
```
## Description

`RequestData(request)` in the above example can get return of 

* a `String` in case of "application/text" or "text/html"
* a `Object` in case of "application/json", "application/x-www-form-urlencoded", "mutipart/form-data"
*  a `String` which is empty if nothing parsed

The request shall be either in `GET` or `POST`, other methods of request will directly return you with an empty `String`. 


## License
MIT
