export interface ITLappfollowup {
  Followup_Id: number; // 0
  TL_Form_Id: number; // from the print_form
  Form_Status: string; // applied
  Followup_Date: String; // from date of commencement
  Sent_To_Date: String; // ""
  Remarks: String; // "Sent from the helpdesk"
  Followup_By_E_Cityzen_ID: number; // 0
  Followup_By_User_ID: string; // loggedin user email
  Followup_By_User_Type: String; // employee
  Next_Followup_E_Cityzen_ID: number; // 0
  Next_Followup_User_ID: string; // "TLC1" || ""
  Next_Followup_User_Type: String; // employee
  Is_Used: String; // N
}
