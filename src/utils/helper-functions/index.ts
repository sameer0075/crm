function removeSensitiveFields<T extends object, K extends keyof T>(
  obj: T,
  key: K
) {
  delete obj[key];
  return obj;
}

export { removeSensitiveFields };
