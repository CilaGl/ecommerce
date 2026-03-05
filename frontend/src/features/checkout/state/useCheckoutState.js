import { useReducer, useEffect, useCallback } from "react";
import { checkoutReducer, initialState, ACTIONS } from "./checkoutReducer";
import {
  loadCheckoutState,
  saveCheckoutState,
  clearCheckoutState,
} from "./checkoutStorage";

export const useCheckoutState = () => {
  const persistedState = loadCheckoutState();
  const [state, dispatch] = useReducer(
    checkoutReducer,
    persistedState || initialState,
  );

  // 💾 Persistir automáticamente
  useEffect(() => {
    saveCheckoutState({
      step: state.step,
      data: state.data,
      completedSteps: state.completedSteps,
    });
  }, [state.step, state.data, state.completedSteps]);

  // 🧹 Limpiar al confirmar pedido
  const resetCheckout = useCallback(() => {
    clearCheckoutState();
    dispatch({ type: ACTIONS.RESET });
  }, []);

  // 🔹 Navegación
  const nextStep = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_STEP });
  }, []);

  const previousStep = useCallback(() => {
    dispatch({ type: ACTIONS.PREVIOUS_STEP });
  }, []);

  // 🔹 Shipping
  const updateShipping = useCallback((values) => {
    dispatch({
      type: ACTIONS.UPDATE_SHIPPING,
      payload: values,
    });
  }, []);

  // 🔹 Payment
  const updatePayment = useCallback((values) => {
    dispatch({
      type: ACTIONS.UPDATE_PAYMENT,
      payload: values,
    });
  }, []);

  return {
    step: state.step,
    data: state.data,
    errors: state.errors,
    completedSteps: state.completedSteps,
    updateShipping,
    updatePayment,
    nextStep,
    previousStep,
    resetCheckout,
  };
};
