import { CHECKOUT_STEPS } from "../state/constants";

export const canAccessStep = (targetStep, completedSteps) => {
  switch (targetStep) {
    case CHECKOUT_STEPS.SHIPPING:
      return true; // Siempre accesible

    case CHECKOUT_STEPS.PAYMENT:
      return completedSteps.includes(CHECKOUT_STEPS.SHIPPING); // Solo si Shipping está completo

    case CHECKOUT_STEPS.REVIEW:
      return (
        completedSteps.includes(CHECKOUT_STEPS.SHIPPING) &&
        completedSteps.includes(CHECKOUT_STEPS.PAYMENT)
      ); // Solo si Shipping y Payment están completos

    default:
      return false; // Paso desconocido, no accesible
  }
};
