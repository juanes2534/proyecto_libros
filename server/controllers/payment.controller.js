// import axios from 'axios'
import request from "request";
// import {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from '../config.js'
const PAYPAL_API_CLIENT = 'AU0jy3cKNf8AJjisBcz9-uxjKQSR-ECqkxLJH6OytXWhvHc4UQ8GyLPAcW1_n7UpnDsfTdIf8XfOowqV';
const PAYPAL_API_SECRET= 'EGsE9imDHTfYKXT-CbByZ2G3_6o-NbVJjf_r4TR-WH6GIRKzT7iuyQkkgpDJc216cPLwdxsTBVr6o5kV';
const auth= {user:PAYPAL_API_CLIENT, pass:PAYPAL_API_SECRET}
export const crearOrden = async(req,res)=>{
    // make a request
    try {
      const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '115'
            }
        }],
        application_context: {
            brand_name: `MiTienda.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', 
            return_url: `http://localhost:8000/payment/capturarOrden`,
            cancel_url: `http://localhost:8000/payment/cancelarOrden`
        }
    }
      request.post(
        `//https://api-m.sandbox.paypal.com/v2/checkout/orders`,{
          auth,
          order,
          json: true
        }
      );
      res.json({data: response.body})
    } catch (error) {
      res.json({message:"hubo error al crear la orden en paypal"})
    }
}
// format the body
    // const params = new URLSearchParams();
    // params.append("grant_type", "client_credentials");

    // Generate an access token
    // const {
    //   data: { access_token },
    // } = await axios.post(
    //   "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    //   params,
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     auth: {
    //       username: PAYPAL_API_CLIENT,
    //       password: PAYPAL_API_SECRET,
    //     },
    //   }
    // );

    // console.log(access_token);
//access_token
    // const params = new URLSearchParams();
    // params.append('grant_type', 'client_credentials')
    // const {data: {access_token}}= await axios.post(`${PAYPAL_API}/v1/oauth2/token`,params,{
    //    auth:{
    //     username:PAYPAL_API_CLIENT,
    //     password:PAYPAL_API_SECRET
    //    } 
    // })
    // const respuesta= await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    //     headers:{
    //        Authorization: `Bearer ${access_token}` 
    //     }
    // })
export const capturaOrden = async(req,res)=>{
    
}
export const cancelarOrden = async(req,res)=>{
    
}