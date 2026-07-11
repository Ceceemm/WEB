export function getDeployMode(args) {
  if (args.length === 0) return 'objects';
  if (args.length === 1 && args[0] === '--website-only') return 'website';
  throw new Error('Unsupported deploy mode. Use no arguments or --website-only.');
}

export async function runDeployMode(mode, actions) {
  if (mode === 'objects') return await actions.deployObjects();
  if (mode === 'website') return await actions.configureWebsite();
  throw new Error(`Unsupported deploy mode: ${mode}`);
}
