import { useCallback, useState } from "react";

/**
 * Provides a toggleable boolean state with a function to toggle it.
 * This hook abstracts the pattern of managing a boolean state, such as for showing/hiding elements
 * or toggling between two states. The initial state can be set to true or false.
 *
 * @param {boolean} initialState - The initial state of the toggle, `false` by default.
 * @returns {[boolean, (value?: boolean | ((prevState: boolean) => boolean)) => void]} A tuple consisting of the current state and a function to toggle or set this state. The setter function can take a boolean value or a function that receives the current state and returns the new state.
 */
export const useToggleState = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  // Enhances the setter function to allow toggling without an explicit parameter.
  const toggle = useCallback((value: boolean | undefined) => {
    setIsToggled(prev => (typeof value === "boolean" ? value : !prev));
  }, []);

  return [isToggled, toggle];
};
