import { describe, expect, it, vi } from 'vitest';
import { getDeployMode, runDeployMode } from './deploy-mode.mjs';

describe('deploy mode', () => {
  it('parses supported modes only', () => {
    expect(getDeployMode([])).toBe('objects');
    expect(getDeployMode(['--website-only'])).toBe('website');
    expect(() => getDeployMode(['--unknown'])).toThrow();
    expect(() => getDeployMode(['--website-only', '--unknown'])).toThrow();
  });

  it('runs only object deployment in objects mode', async () => {
    const deployObjects = vi.fn();
    const configureWebsite = vi.fn();
    await runDeployMode('objects', { deployObjects, configureWebsite });
    expect(deployObjects).toHaveBeenCalledOnce();
    expect(configureWebsite).not.toHaveBeenCalled();
  });

  it('runs only website configuration in website mode', async () => {
    const deployObjects = vi.fn();
    const configureWebsite = vi.fn();
    await runDeployMode('website', { deployObjects, configureWebsite });
    expect(configureWebsite).toHaveBeenCalledOnce();
    expect(deployObjects).not.toHaveBeenCalled();
  });

  it('propagates website configuration errors', async () => {
    const error = new Error('denied');
    await expect(runDeployMode('website', {
      deployObjects: vi.fn(),
      configureWebsite: vi.fn().mockRejectedValue(error),
    })).rejects.toThrow(error);
  });
});
