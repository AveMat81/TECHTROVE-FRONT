import { initMercadoPago } from "@mercadopago/sdk-react";

const publicKey = 'TEST-dc97b69f-7789-424f-8254-81f321f3d7ab'; 

initMercadoPago(publicKey); // Inicializa Mercado Pago con tu clave pública

const CreatePayment = async (preference) => {
  try {
    const response = await fetch('http://localhost:3001/api/payment/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ preference }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puede ser la preferencia de pago generada o la respuesta de tu backend
    }

    throw new Error('Error al crear el pago');
  } catch (error) {
    console.error('Error al crear el pago:', error);
    throw error;
  }
};

export default CreatePayment;
