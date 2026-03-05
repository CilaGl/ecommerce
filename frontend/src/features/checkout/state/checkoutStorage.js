const STORAGE_KEY = "checkout_state";

export const loadCheckoutState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    return null;
  }
};

export const saveCheckoutState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving checkout state:", err);
  }
};

export const clearCheckoutState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
