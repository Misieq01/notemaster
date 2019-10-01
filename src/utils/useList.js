import { useState, useRef } from "react";

/**
 * Hook for easy array manipulation.
 * @param {Array} value
 * @returns {Array} The first element of the list is value. The second argument is the object with methods (set, add, change, remove, move).
 */
export function useList(value) {
  if (!Array.isArray(value))
    throw new Error(`useList expects an array, not: ${typeof value}`);

  const ref = useRef(null);
  const [list, setList] = useState(value);

  if (ref.current === null) {
    // sets the state
    function set(v) {
      setList(v);
    }

    // adds an element
    function add(v, i) {
      setList(l => {
        if (i === undefined) i = l.length;
        if (typeof i !== "number")
          throw new Error(
            `Add method expects a number for position, got: ${typeof i}`
          );
        if (i < 0 || i > l.length)
          throw new Error(
            `Number in range of 0 and ${l.length} expected, got: ${i}`
          );

        l.splice(i, 0, v);

        return [...l];
      });
    }

    // delete item by index
    function remove(i) {
      setList(l => {
        if (l.length < i)
          throw new Error(
            `Element with index ${i} does not exist in the list.`
          );

        l.splice(i, 1);

        return [...l];
      });
    }

    // modifies an element after an index
    function change(v, i) {
      setList(l => {
        if (l.length < i)
          throw new Error(
            `Element with index ${i} does not exist in the list.`
          );

        l[i] = v;

        return [...l];
      });
    }

    // moves an element
    function move(prevIndex, nextIndex) {
      setList(l => {
        if (l.length < prevIndex)
          throw new Error(
            `Element with current index ${prevIndex} does not exist in the list.`
          );

        const [removed] = l.splice(prevIndex, 1);
        l.splice(nextIndex, 0, removed);

        return [...l];
      });
    }

    ref.current = [list, { set, add, remove, change, move }];
  }
  ref.current[0] = list;

  return ref.current;
}
