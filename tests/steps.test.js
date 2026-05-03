import { describe, it, expect } from 'vitest';
import { steps } from '../src/steps.js';

describe('steps data', () => {
  it('should have exactly 6 steps', () => {
    expect(steps).toHaveLength(6);
  });

  it('every step has all required properties', () => {
    const requiredKeys = ['id', 'title', 'icon', 'description', 'tips', 'commonMistakes'];
    steps.forEach((step) => {
      requiredKeys.forEach((key) => {
        expect(step).toHaveProperty(key);
      });
    });
  });

  it('tips is always an array of length 2', () => {
    steps.forEach((step) => {
      expect(Array.isArray(step.tips)).toBe(true);
      expect(step.tips).toHaveLength(2);
    });
  });

  it('step ids are sequential starting from 1', () => {
    steps.forEach((step, index) => {
      expect(step.id).toBe(index + 1);
    });
  });

  it('no step has empty string values', () => {
    steps.forEach((step) => {
      expect(step.title).not.toBe('');
      expect(step.icon).not.toBe('');
      expect(step.description).not.toBe('');
      expect(step.commonMistakes).not.toBe('');
      step.tips.forEach((tip) => {
        expect(tip).not.toBe('');
      });
    });
  });
});
