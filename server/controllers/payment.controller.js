import axios from 'axios'
import request from "request";
// Configurar credenciales
const clientId = 'AU0jy3cKNf8AJjisBcz9-uxjKQSR-ECqkxLJH6OytXWhvHc4UQ8GyLPAcW1_n7UpnDsfTdIf8XfOowqV';
const clientSecret = 'EGsE9imDHTfYKXT-CbByZ2G3_6o-NbVJjf_r4TR-WH6GIRKzT7iuyQkkgpDJc216cPLwdxsTBVr6o5kV';
const baseURL = 'api-m.sandbox.paypal.com'; // Sandbox URL, cambiar a la URL de producción si es necesario

export const crearOrden = async(req, res) => {
  const {libroSeleccionado, valor}=req.body
  try {
    // Obtener el token de acceso
      // const clientId = 'TU_CLIENT_ID';
      // const secret = 'TU_SECRET';
      const credentials = `${clientId}:${clientSecret}`;
      const base64Credentials = Buffer.from(credentials).toString('base64');
      
      const configToken = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${base64Credentials}`
          }
      };

      const bodyToken = 'grant_type=client_credentials';

      const responseToken = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', bodyToken, configToken);
      const accessToken = responseToken.data.access_token;

      // Datos de la orden
      const orderData = {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: `${valor}`
              },
              custom_id: libroSeleccionado
          }],
          application_context: {
              brand_name: 'Tienda de libros',
              landing_page: 'NO_PREFERENCE',
              user_action: 'PAY_NOW',
              return_url: 'http://localhost:8000/payment/capturaOrden',
              cancel_url: 'http://localhost:8000/payment/cancelarOrden'
          }
      };

      // Configuración para la solicitud de creación de orden
      const configOrder = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
          }
      };
      // Crear la orden
      const responseOrder = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', orderData, configOrder);
      
      res.json({ data: responseOrder.data });
  } catch (error) {
      console.error('Error al crear la orden en PayPal:', error);
      res.status(500).json({ message: 'Hubo un error al crear la orden en PayPal' });
  }
};
// Esta es una funcion en el cual captura el dinero
export const capturaOrden = async (req, res) => {
  try {
    const { token, PayerID } = req.query;
    
    // Obtener el token de acceso
    const credentials = `${clientId}:${clientSecret}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    
    const configToken = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`
      }
    };
    
    const bodyToken = 'grant_type=client_credentials';
    const responseToken = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', bodyToken, configToken);
    const accessToken = responseToken.data.access_token;

    // Capturar la orden
    const configCapture = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const responseCapture = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, null, configCapture);
    const libro= token.custom_id
    //token.custom_id
    // const nombreConGuiones = libro.replace(/\s+/g, '-');
    res.json({ data: responseCapture.data });
    // res.redirect(301,`http://localhost:3000/libro/${nombreConGuiones}`)
    // res.redirect(301,`http://localhost:8000/user/archivo_pdf/${libro}`)
  } catch (error) {
    console.error('Error al capturar la orden en PayPal:', error);
    res.status(500).json({ message: 'Hubo un error al capturar la orden en PayPal' });
  }
};
export const cancelarOrden = async(req,res)=>{

}