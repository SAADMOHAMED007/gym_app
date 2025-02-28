"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const app_module_1 = require("../app.module");
const test_utils_1 = require("./test.utils");
let testUtils = null;
beforeAll(async () => {
    testUtils = new test_utils_1.TestUtils();
    await testUtils.initializeApp();
    const app = testUtils.getApp();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    global.testUtils = testUtils;
});
afterAll(async () => {
    if (testUtils) {
        await testUtils.closeApp();
        testUtils = null;
        global.testUtils = null;
    }
});
beforeEach(async () => {
    if (testUtils) {
        await testUtils.cleanTestData();
    }
});
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});
const mockConsole = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};
const originalConsole = { ...console };
beforeAll(() => {
    global.console = { ...console, ...mockConsole };
});
afterAll(() => {
    global.console = originalConsole;
});
beforeEach(() => {
    jest.resetAllMocks();
    Object.values(mockConsole).forEach(mock => mock.mockClear());
});
const originalEnv = process.env;
beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
});
afterEach(() => {
    process.env = originalEnv;
});
//# sourceMappingURL=setup.js.map