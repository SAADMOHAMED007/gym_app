declare global {
  namespace NodeJS {
    interface Global {
      wait: (ms: number) => Promise<void>;
    }
  }

  // Add custom matcher
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}

// Export something to make this a module
export {};
