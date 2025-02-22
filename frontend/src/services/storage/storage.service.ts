import { StorageKey } from 'common/enums/enums';

type Constructor = {
  storage: globalThis.Storage;
};

class Storage {
  #storage: globalThis.Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  public getItem(key: StorageKey): string | null {
    return this.#storage.getItem(key);
  }

  public setItem(key: StorageKey, value: string): void {
    return this.#storage.setItem(key, value);
  }

  public removeItem(key: StorageKey): void {
    return this.#storage.removeItem(key);
  }

  public clear(): void {
    return this.#storage.clear();
  }
}

export { Storage };
