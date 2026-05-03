import { describe, it, expect, vi } from 'vitest';
import { sanitizeInput } from '../src/gemini.js';

// Mock @google/generative-ai before importing askGemini
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: vi.fn().mockRejectedValue(new Error('API error')),
      }),
    })),
  };
});

// Dynamic import so the mock is in place
const { askGemini } = await import('../src/gemini.js');

describe('sanitizeInput', () => {
  it('trims whitespace correctly', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('strips HTML tags', () => {
    expect(sanitizeInput("<script>alert('xss')</script>")).toBe("alert('xss')");
  });

  it('strips nested HTML tags', () => {
    expect(sanitizeInput('<div><b>bold</b></div>')).toBe('bold');
  });

  it('truncates to 500 chars max', () => {
    const longStr = 'a'.repeat(600);
    const result = sanitizeInput(longStr);
    expect(result).toHaveLength(500);
  });

  it('handles empty string without throwing', () => {
    expect(() => sanitizeInput('')).not.toThrow();
    expect(sanitizeInput('')).toBe('');
  });

  it('handles non-string input without throwing', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });
});

describe('askGemini', () => {
  it('returns fallback string when API throws error', async () => {
    const result = await askGemini('Voter Registration', 'How do I register?');
    expect(result).toContain('Sorry');
    expect(result).toContain('try again');
  });

  it('does not throw even when API key is undefined', async () => {
    await expect(
      askGemini('Voter Registration', 'test question')
    ).resolves.not.toThrow();
  });
});
