// Validar email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar contraseña (mínimo 6 caracteres)
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Validar nombre (mínimo 2 caracteres)
export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Validar formulario de login
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(email)) {
    errors.email = "Email inválido";
  }

  if (!password) {
    errors.password = "La contraseña es requerida";
  } else if (!validatePassword(password)) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validar formulario de registro
export const validateRegisterForm = (
  name,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (!name) {
    errors.name = "El nombre es requerido";
  } else if (!validateName(name)) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!email) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(email)) {
    errors.email = "Email inválido";
  }

  if (!password) {
    errors.password = "La contraseña es requerida";
  } else if (!validatePassword(password)) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirma tu contraseña";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
