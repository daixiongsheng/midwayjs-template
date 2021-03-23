import {add} from '../../src/utils/';
// import * as assert from 'assert';

describe('test/utils/index.ts', () => {
    it('add ', () => {
        // create app

        expect(add(100, 100)).toBe(200);
    });
});
