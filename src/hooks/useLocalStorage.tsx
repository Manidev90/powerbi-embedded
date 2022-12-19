import { useState } from "react";

/**
 * Retrieve serialized object from localStorage
 *
 * @param key
 * @returns  null if the key is not found, otherwise
 * returns the object.
 */
function useLocalStorage<T>(key: string): [T | null, (val: T) => void] {
  // Passing a function to useState so that it only runs once
  const [value, setValue] = useState<T | null>(() => {
    try {
      // Retrieve item
      const item = window.localStorage.getItem(key);
      // Attempt to deserialize
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // Wrap setValue, to also allow persisting data to local storage
  const saveValue = (val: T) => {
    try {
      setValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, saveValue];
}

export default useLocalStorage;
