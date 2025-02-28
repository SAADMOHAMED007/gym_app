declare global {
    namespace NodeJS {
        interface Global {
            wait: (ms: number) => Promise<void>;
        }
    }
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(floor: number, ceiling: number): R;
        }
    }
}
export {};
