import { describe, it, expect } from 'vitest';
import bcrypt from 'bcryptjs';

// ─── Password hashing ────────────────────────────────────────

describe('password hashing', () => {
  it('hashes a password', async () => {
    const hash = await bcrypt.hash('Admin@2026!', 12);
    expect(hash).not.toBe('Admin@2026!');
    expect(hash.startsWith('$2b$')).toBe(true);
  });

  it('verifies correct password', async () => {
    const hash = await bcrypt.hash('Admin@2026!', 10);
    const isValid = await bcrypt.compare('Admin@2026!', hash);
    expect(isValid).toBe(true);
  });

  it('rejects wrong password', async () => {
    const hash = await bcrypt.hash('Admin@2026!', 10);
    const isValid = await bcrypt.compare('wrongpassword', hash);
    expect(isValid).toBe(false);
  });

  it('two hashes of same password are different (salt)', async () => {
    const hash1 = await bcrypt.hash('Admin@2026!', 10);
    const hash2 = await bcrypt.hash('Admin@2026!', 10);
    expect(hash1).not.toBe(hash2);
  });
});

// ─── Role logic ──────────────────────────────────────────────

type Permission = { module: string; canRead: boolean; canWrite: boolean; canDelete: boolean };

function hasPermission(permissions: Permission[], module: string, action: 'read' | 'write' | 'delete'): boolean {
  const perm = permissions.find(p => p.module === module);
  if (!perm) return false;
  if (action === 'read') return perm.canRead;
  if (action === 'write') return perm.canWrite;
  if (action === 'delete') return perm.canDelete;
  return false;
}

describe('hasPermission', () => {
  const adminPerms: Permission[] = [
    { module: 'catalog', canRead: true, canWrite: true, canDelete: true },
    { module: 'accounting', canRead: true, canWrite: true, canDelete: true },
    { module: 'users', canRead: true, canWrite: true, canDelete: true },
  ];

  const editorPerms: Permission[] = [
    { module: 'catalog', canRead: true, canWrite: true, canDelete: false },
    { module: 'accounting', canRead: false, canWrite: false, canDelete: false },
  ];

  it('admin can read catalog', () => {
    expect(hasPermission(adminPerms, 'catalog', 'read')).toBe(true);
  });

  it('admin can delete', () => {
    expect(hasPermission(adminPerms, 'catalog', 'delete')).toBe(true);
  });

  it('editor can write catalog', () => {
    expect(hasPermission(editorPerms, 'catalog', 'write')).toBe(true);
  });

  it('editor cannot delete catalog', () => {
    expect(hasPermission(editorPerms, 'catalog', 'delete')).toBe(false);
  });

  it('editor cannot read accounting', () => {
    expect(hasPermission(editorPerms, 'accounting', 'read')).toBe(false);
  });

  it('returns false for unknown module', () => {
    expect(hasPermission(editorPerms, 'settings', 'read')).toBe(false);
  });
});
