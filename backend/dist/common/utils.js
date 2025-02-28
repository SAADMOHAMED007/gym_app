"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationObject = createPaginationObject;
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
exports.generateUniqueFileName = generateUniqueFileName;
exports.formatBytes = formatBytes;
exports.isValidDate = isValidDate;
exports.normalizeEmail = normalizeEmail;
exports.sanitizeFileName = sanitizeFileName;
exports.generateRandomPassword = generateRandomPassword;
exports.sleep = sleep;
exports.parseBoolean = parseBoolean;
exports.removeUndefined = removeUndefined;
exports.generateSlug = generateSlug;
const constants_1 = require("./constants");
const bcrypt = require("bcrypt");
const path_1 = require("path");
const uuid_1 = require("uuid");
function createPaginationObject(items, total, { page = constants_1.DEFAULT_PAGINATION.page, limit = constants_1.DEFAULT_PAGINATION.limit }) {
    const totalPages = Math.ceil(total / limit);
    return {
        items,
        total,
        page,
        limit,
        totalPages,
    };
}
async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
async function comparePasswords(plainText, hashedPassword) {
    return bcrypt.compare(plainText, hashedPassword);
}
function generateUniqueFileName(originalName) {
    const fileExtension = (0, path_1.extname)(originalName);
    const uniqueId = (0, uuid_1.v4)();
    return `${uniqueId}${fileExtension}`;
}
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
function isValidDate(date) {
    const timestamp = Date.parse(date);
    return !isNaN(timestamp);
}
function normalizeEmail(email) {
    return email.toLowerCase().trim();
}
function sanitizeFileName(fileName) {
    return fileName
        .toLowerCase()
        .replace(/[^a-z0-9.]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
function generateRandomPassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function parseBoolean(value) {
    if (typeof value === 'boolean')
        return value;
    if (typeof value === 'string') {
        return ['true', '1', 'yes'].includes(value.toLowerCase());
    }
    return false;
}
function removeUndefined(obj) {
    return Object.entries(obj)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
function generateSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
//# sourceMappingURL=utils.js.map