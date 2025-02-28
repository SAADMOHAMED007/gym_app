import { PaginationParams, PaginatedResponse } from './types';
import { DEFAULT_PAGINATION } from './constants';
import * as bcrypt from 'bcrypt';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export function createPaginationObject<T>(
  items: T[],
  total: number,
  { page = DEFAULT_PAGINATION.page, limit = DEFAULT_PAGINATION.limit }: PaginationParams,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    items,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(plainText: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashedPassword);
}

export function generateUniqueFileName(originalName: string): string {
  const fileExtension = extname(originalName);
  const uniqueId = uuidv4();
  return `${uniqueId}${fileExtension}`;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function isValidDate(date: any): boolean {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateRandomPassword(length = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return ['true', '1', 'yes'].includes(value.toLowerCase());
  }
  return false;
}

export function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
