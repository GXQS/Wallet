const GENERATED_PATHS = new Set(['apps/web/next-env.d.ts']);

function shellQuote(value) {
  return `'${value.replace(/'/g, "'\\''")}'`;
}

function filterGenerated(files) {
  return files.filter((file) => !GENERATED_PATHS.has(file));
}

module.exports = {
  '*.{ts,tsx,js,jsx,json,md,css}': (files) => {
    const filtered = filterGenerated(files);
    if (filtered.length === 0) {
      return [];
    }
    return `prettier --write ${filtered.map(shellQuote).join(' ')}`;
  },
};
