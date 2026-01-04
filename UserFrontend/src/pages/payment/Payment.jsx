import { NavLink, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
function Payment() {
  const params = useLocation();
  const totalPrice = params?.state?.order?.totalAmount;
  let transaction_uuid = params.state?.order?._id ;
  let Message = `total_amount=${totalPrice},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  let hash = CryptoJS.HmacSHA256(Message, "8gBm/:&EnhH.1/q");
  let signature = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-96 bg-gray-200 pt-16  ">
      <form
        className=" w-[500px] border m-auto p-7 flex gap-y-5 flex-col justify-center items-center bg-white "
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={totalPrice}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value="0"
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={totalPrice}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={transaction_uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value="http://localhost:9000/api/order/payment"
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value="http://localhost:5173/fail"
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={signature}
          required
        />
        <p className="text-2xl font-bold text-red-400"> Rs.{totalPrice} </p>
        <div className="flex gap-10  ">
             <input
          className="bg-yellow-900 p-2 w-50 text-white"
          value="Pay Via Esewa"
          type="submit"
        />
        <button className=" w-50 bg-black text-white">
          <NavLink to="/product">
            Back
          </NavLink>
          
        </button>
        </div>
       
      </form>
    </div>
  );
}

export default Payment;
