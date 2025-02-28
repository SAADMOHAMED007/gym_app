import { TestUtils } from './test.utils';
declare global {
    namespace NodeJS {
        interface Global {
            testUtils: TestUtils | null;
        }
    }
}
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(floor: number, ceiling: number): R;
        }
    }
}
