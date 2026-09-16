import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Audio API for Vitest environment
class MockAudioContext {
  state = 'running';
  currentTime = 0;
  resume = vi.fn();
  createOscillator = vi.fn(() => ({
    connect: vi.fn(),
    type: 'sine',
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    start: vi.fn(),
    stop: vi.fn(),
  }));
  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }));
}

// @ts-expect-error Mocking AudioContext
window.AudioContext = MockAudioContext;
