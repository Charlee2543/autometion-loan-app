"use client";
import { useEffect, useState } from "react";
import { dataLoan } from "@/types/dataTypes";
import axios, { AxiosResponse } from "axios";
import liff from "@line/liff";

export default function Page() {
   // const [field0, setField0] = useState<string>("");

   // const initialData: dataLoan = {
   //    fullName: "",
   //    phoneNumbder: 0,
   //    titleDeedNo: "",
   //    district: "",
   //    Province: "",
   //    price: 0,
   // };

   // type SetterFunction<T> = (value: T) => void;
   // const setValueInput = (
   //    value: number | string,
   //    setValue: SetterFunction<string | number>
   // ): void => {
   //    setValue(value);
   // };

   const urlSubmit = process.env.NEXT_PUBLIC_N8N_URL_SUBMIT_LOAN_FORM;
   // const [nameUser, setNameUser] = useState<string>("");
   // const [idUser, setIdUser] = useState<string>("");
   const [loanData, setLoanData] = useState<dataLoan>({
      fullName: "",
      phoneNumbder: undefined,
      titleDeedNo: "",
      district: "",
      Province: "",
      price: undefined,
      lineName: "",
      idUser: "",
   });
   // Promise<AxiosResponse<Response>>
   const submitloanData = async (objectData: dataLoan): Promise<void> => {
      const data = await axios.post(`${urlSubmit}`, {
         objectData,
      });
      console.log(data);
   };

   // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม (Event Handler)
   // ต้องรับ Event เข้ามาและเรียกใช้ e.preventDefault()
   const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
   ): Promise<void> => {
      // ป้องกันการรีเฟรชหน้าเว็บแบบปกติของ HTML Form
      e.preventDefault();

      // เรียกใช้ logic การส่งข้อมูล
      await submitloanData(loanData);
   };

   // const lineLogin = async () => {
   //    await liff.init({
   //       liffId: `${process.env.NEXT_PUBLIC_LIFF_ID}`,
   //    });
   //    if (!liff.isLoggedIn()) {
   //       liff.login();
   //       return false;
   //    }
   //    const profile = await liff.getProfile();
   //    setProfileUser(profile);
   //    console.log(`login line แล้วนะ` + liff.isLoggedIn());
   // };

   useEffect(() => {
      const lineLogin = async () => {
         await liff.init({
            liffId: `${process.env.NEXT_PUBLIC_LIFF_ID}`,
         });
         if (!liff.isLoggedIn()) {
            liff.login();
            return false;
         }
         const responseProfile = await liff.getProfile();
         console.log("profile: ", responseProfile);
         if (responseProfile) {
            setLoanData((prevData) => ({
               ...prevData,
               lineName: responseProfile.displayName,
            }));
            setLoanData((prevData) => ({
               ...prevData,
               idUser: responseProfile.userId,
            }));
         }
         console.log(`login line แล้วนะ` + liff.isLoggedIn());
      };

      lineLogin();
   }, []);
   // lineLogin();

   return (
      <div className=" w-full h-full  bg-(--color-background) flex justify-center m-4">
         <section className="box-content p-6 w-full max-w-[400px]  rounded-(--border-radius-card) bg-(--color-card-bg) border-2 border-(--color-input-border) shadow-2xl ">
            <form
               className="card w-full flex flex-col items-center"
               onSubmit={handleSubmit}
               method="POST"
               name="n8n-form"
               id="n8n-form"
               // novalidate=""
            >
               <div className="form-header">
                  <h1>คำขอสินเชื่อ (Loan Application)</h1>
               </div>
               <p className="text-stone-800">Line Nmae : {loanData.lineName}</p>

               <div className="inputs-wrapper w-full ">
                  <div className="form-group ">
                     <label
                        className="form-label form-required"
                        htmlFor="field-0"
                     >
                        ชื่อ-นามสกุล (Full Name)
                     </label>
                     <input
                        className="form-input form-required"
                        type="text"
                        id="field-0"
                        name="field-0"
                        value={loanData.fullName}
                        onChange={(e) => {
                           // setValueInput(e.target.value, setField0);
                           setLoanData((prevData) => ({
                              ...prevData,
                              fullName: e.target.value,
                           }));
                        }}
                        placeholder="ชื่อ นามสกุล"
                     />
                     <p className="error-field-0 error-hidden">
                        This field is required
                     </p>
                  </div>

                  <div className="form-group">
                     <label
                        className="form-label form-required"
                        htmlFor="field-1"
                     >
                        เบอร์โทรศัพท์ (Phone Number)
                     </label>
                     <input
                        className="form-input form-required"
                        type="number"
                        id="field-1"
                        name="field-1"
                        value={loanData.phoneNumbder}
                        onChange={(e) => {
                           setLoanData((prevData) => ({
                              ...prevData,
                              phoneNumbder: Number(e.target.value),
                           }));
                        }}
                        placeholder=""
                     />
                     <p className="error-field-1 error-hidden">
                        This field is required
                     </p>
                  </div>

                  <div className="form-group">
                     <label
                        className="form-label form-required"
                        htmlFor="field-2"
                     >
                        เลขที่ดิน
                     </label>
                     <input
                        className="form-input form-required"
                        type="text"
                        id="field-2"
                        name="field-2"
                        value={loanData.titleDeedNo}
                        onChange={(e) => {
                           setLoanData((prevData) => ({
                              ...prevData,
                              titleDeedNo: e.target.value,
                           }));
                        }}
                        placeholder=""
                     />
                     <p className="error-field-2 error-hidden">
                        This field is required
                     </p>
                  </div>

                  <div className="form-group">
                     <label
                        className="form-label form-required"
                        htmlFor="field-3"
                     >
                        อำเภอ
                     </label>
                     <input
                        className="form-input form-required"
                        type="text"
                        id="field-3"
                        name="field-3"
                        value={loanData.district}
                        onChange={(e) => {
                           setLoanData((prevData) => ({
                              ...prevData,
                              district: e.target.value,
                           }));
                        }}
                        placeholder=""
                     />
                     <p className="error-field-3 error-hidden">
                        This field is required
                     </p>
                  </div>

                  <div className="form-group">
                     <label
                        className="form-label form-required"
                        htmlFor="field-4"
                     >
                        จังหวัด
                     </label>
                     <input
                        className="form-input form-required"
                        type="text"
                        id="field-4"
                        name="field-4"
                        value={loanData.Province}
                        onChange={(e) => {
                           setLoanData((prevData) => ({
                              ...prevData,
                              Province: e.target.value,
                           }));
                        }}
                        placeholder=""
                     />
                     <p className="error-field-4 error-hidden">
                        This field is required
                     </p>
                  </div>

                  <div className="form-group">
                     <label className="form-label " htmlFor="field-5">
                        จำนวนเงิน
                     </label>
                     <input
                        className="form-input "
                        type="number"
                        id="field-5"
                        name="field-5"
                        value={loanData.price}
                        onChange={(e) => {
                           setLoanData((prevData) => ({
                              ...prevData,
                              price: Number(e.target.value),
                           }));
                        }}
                        placeholder=""
                     />
                     <p className="error-field-5 error-hidden">
                        This field is required
                     </p>
                  </div>
               </div>

               <button id="submit-btn" type="submit">
                  <span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 512 512"
                     >
                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path>
                     </svg>
                  </span>
                  Submit
               </button>
            </form>
            {/* 
         <div
            className="card"
            id="submitted-form"
            // style={"display: none;"}
         >
            <div className="form-header">
               <h1 id="submitted-header">Form Submitted</h1>
               <p id="submitted-content">Your response has been recorded</p>
            </div>
         </div>

         <input
            id="useResponseData"
            // style={"display: none;" value="true"}
         /> */}
         </section>
      </div>
   );
}
