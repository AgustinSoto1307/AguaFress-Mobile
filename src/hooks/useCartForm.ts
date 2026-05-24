import { useState } from 'react';

// Estructura de los datos del formulario
export interface FormFields {
  address: string;
  phone: string;
  notes: string;
}

// Estructura para los mensajes de error
export interface FormErrors {
  address?: string;
  phone?: string;
}

export function useCartForm(onSubmitSuccess: () => void) {
  // 1. Estado para los campos controlados
  const [fields, setFields] = useState<FormFields>({
    address: '',
    phone: '',
    notes: '',
  });

  // 2. Estado para manejar los errores de validación
  const [errors, setErrors] = useState<FormErrors>({});

  // Manejador genérico para actualizar los inputs
  const handleChange = (key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    
    // Limpiamos el error del campo apenas el usuario empieza a escribir de nuevo
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Función de validación y envío
  const handleSubmit = () => {
    const currentErrors: FormErrors = {};
    let isValid = true;

    // Validación de la dirección (que no esté vacía)
    if (!fields.address.trim()) {
      currentErrors.address = 'La dirección de entrega es obligatoria.';
      isValid = false;
    } else if (fields.address.trim().length < 5) {
      currentErrors.address = 'Ingresá una dirección válida (mínimo 5 caracteres).';
      isValid = false;
    }

    // Validación del teléfono (que no esté vacío y sean solo números válidos)
    const phoneRegex = /^[0-9]{7,15}$/; // Entre 7 y 15 números sueltos
    if (!fields.phone.trim()) {
      currentErrors.phone = 'El teléfono de contacto es obligatorio.';
      isValid = false;
    } else if (!phoneRegex.test(fields.phone.trim())) {
      currentErrors.phone = 'Ingresá un número de teléfono válido (solo números).';
      isValid = false;
    }

    if (!isValid) {
      setErrors(currentErrors);
    } else {
      // Si todo está bien, ejecutamos la simulación de éxito
      onSubmitSuccess();
    }
  };

  return {
    fields,
    errors,
    handleChange,
    handleSubmit,
  };
}