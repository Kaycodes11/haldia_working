export interface ITLapppayment {
  Payment_Id: number; // 1
  TL_Form_Id: number; // 1
  Payment_Date: String; // trade_details.value.date_of_commencement
  Payment_Receipt_No: String; // ""
  TL_Fin_Year_ID: number; // trade_details.value.financial_year
  Posting_Fin_Year_ID: number; // trade_details.value.financial_year
  Fee_Trade_id: number; // 0
  Description: String; //
  Amount: number; // from api or 50
}
