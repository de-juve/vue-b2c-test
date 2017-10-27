export default {
  set(storageKey, storageValue) {
    const currentValue = JSON.stringify(storageValue);
    window.localStorage.setItem(storageKey, currentValue);
  },

  get(storageKey) {
    let storageValue = window.localStorage.getItem(storageKey) || null;

    if (typeof storageValue === 'string' && storageValue[0] === '{') {
      try {
        storageValue = JSON.parse(storageValue);
      } catch (e) {
        storageValue = null;
      }
    }
    return storageValue;
  },

  removeItem(storageKey) {
    window.localStorage.removeItem(storageKey);
  },

  removeByPattern(pattern) {
    if (!pattern) {
// eslint-disable-next-line no-console
      console.error('localStorage:removeByPattern: invalid parameter', pattern);
      return;
    }
    const arr = []; // Array to hold the keys
// Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < window.localStorage.length; i += 1) {
      if (window.localStorage.key(i).substring(0, pattern.length) === pattern) {
        arr.push(localStorage.key(i));
      }
    }

// Iterate over arr and remove the items by key
    for (let i = 0; i < arr.length; i += 1) {
      window.localStorage.removeItem(arr[i]);
    }
  },

  clear() {
    window.localStorage.clear();
  },
};
