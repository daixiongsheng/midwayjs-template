import {createApp, close, createHttpRequest} from '@midwayjs/mock';
import {Framework} from '@midwayjs/web';
// import * as assert from 'assert';

describe('test/controller/user.test.ts', () => {

    it('should get /user/get', async () => {
        // create app
        const app = await createApp<Framework>();

        // make request
        const result = await createHttpRequest(app).get('/user/get').query({id: 1});
        console.log(result);

        // use expect by jest
        expect(result.status).toBe(200);
        expect(result.body.msg).toBe('ok');

        // or use assert
        // assert.deepStrictEqual(result.status, 200);
        // assert.deepStrictEqual(result.body.data.id, '1');

        // close app
        await close(app);
    });
});
