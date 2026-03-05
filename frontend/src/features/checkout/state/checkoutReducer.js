import { CHECKOUT_ORDER, CHECKOUT_STEPS } from "./constants";

export const ACTIONS = {
  NEXT_STEP: "NEXT_STEP",
  PREVIOUS_STEP: "PREVIOUS_STEP",
  UPDATE_SHIPPING: "UPDATE_SHIPPING",
  UPDATE_PAYMENT: "UPDATE_PAYMENT",
  CONFIRM_ORDER: "CONFIRM_ORDER",
  RESET: "RESET",
};

export const initialState = {
  step: CHECKOUT_STEPS.SHIPPING,
  data: {
    shipping: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
    payment: {
      method: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  },
  errors: {},
  completedSteps: [],
};

export function checkoutReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_SHIPPING:
      console.log("Reducer UPDATE_SHIPPING payload:", action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          shipping: {
            ...state.data.shipping,
            ...action.payload,
          },
        },
      };

    case ACTIONS.UPDATE_PAYMENT:
      return {
        ...state,
        data: {
          ...state.data,
          payment: {
            ...state.data.payment,
            ...action.payload,
          },
        },
      };

    case ACTIONS.NEXT_STEP: {
      const errors = validateStep(state);

      // ⛔ BLOQUEAR si hay errores
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }

      const currentIndex = CHECKOUT_ORDER.indexOf(state.step);
      const nextStep = CHECKOUT_ORDER[currentIndex + 1];

      if (!nextStep) return state;

      return {
        ...state,
        step: nextStep,
        errors: {},
        completedSteps: [...state.completedSteps, state.step],
      };
    }

    case ACTIONS.PREVIOUS_STEP: {
      const currentIndex = CHECKOUT_ORDER.indexOf(state.step);
      const prevStep = CHECKOUT_ORDER[currentIndex - 1];

      if (!prevStep) return state;

      return {
        ...state,
        step: prevStep,
        errors: {},
        completedSteps: state.completedSteps.filter(
          (step) => step !== state.step,
        ),
      };
    }

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

const validateStep = (state) => {
  const errors = {};

  switch (state.step) {
    case CHECKOUT_STEPS.SHIPPING: {
      const shipping = state.data.shipping;
      if (!shipping.fullName) errors.fullName = "Ingresa tu Nombre completo";
      if (!shipping.email) errors.email = "Ingresa un Correo electrónico";
      if (!shipping.address) errors.address = "Ingresa una Dirección";
      if (!shipping.city) errors.city = "Ingresa una Ciudad";
      if (!shipping.zipCode) errors.zip = "Ingresa un Código postal";
      break;
    }

    case CHECKOUT_STEPS.PAYMENT: {
      const payment = state.data.payment;
      if (!payment.method) errors.method = "Selecciona un método de pago";

      if (payment.method === "card") {
        if (!payment.cardNumber)
          errors.cardNumber = "Ingresa el número de tarjeta";
        if (!payment.expiry) errors.expiry = "Ingresa la fecha de expiración";
        if (!payment.cvv) errors.cvv = "Ingresa el CVV";
      }
      break;
    }

    default:
      break;
  }

  return errors;
};
