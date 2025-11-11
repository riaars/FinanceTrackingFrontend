import InputDate from "@/components/Date";
import Dialog from "@/components/Dialog";
import Dropdown from "@/components/Dropdown";
import { Transaction } from "@/features/transaction/api/type";
import { formattedDate } from "@/utils/helpers";
import React, { useEffect } from "react";
import { useUpdateRecurringMutation } from "../api";
import Input from "@/components/Input";

const intervalOptions = ["daily", "weekly", "monthly", "yearly"];

type UpdateRecurringPlanDialogProps = {
  toggleDialog: () => void;
  selectedRecurring: Transaction;
  setSelectedRecurring: (item: Transaction) => void;
};
const UpdateRecurringPlanDialog = ({
  toggleDialog,
  selectedRecurring,
  setSelectedRecurring,
}: UpdateRecurringPlanDialogProps) => {
  const [updateRecurring, { isLoading, isSuccess }] =
    useUpdateRecurringMutation();

  const handleChange = (name: string, value: string) => {
    setSelectedRecurring({ ...selectedRecurring, [name]: value });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toggleDialog();
    }
  }, [isLoading, isSuccess, toggleDialog]);

  return (
    <Dialog title="Update Recurring Plan" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__header">
          {selectedRecurring?.transaction_id}
        </div>
        <div className="dialog__content__body">
          <Input
            name="category"
            type="string"
            value={selectedRecurring?.category || ""}
            placeholder="Next Date"
            isDisabled
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <Input
            name="detail"
            type="string"
            value={selectedRecurring?.detail || ""}
            placeholder="Transaction Details"
            isDisabled
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <InputDate
            name="nextDate"
            value={formattedDate(selectedRecurring?.nextDate) || ""}
            placeholder="Next Date"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            min="1970-01-01"
            max={formattedDate(new Date(Date.now()).toISOString())}
          />

          <Dropdown
            options={intervalOptions}
            name="interval"
            value={selectedRecurring?.interval || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={() => {
            if (selectedRecurring) {
              updateRecurring(selectedRecurring);
            }
          }}
        >
          Update
        </button>
      </div>
    </Dialog>
  );
};

export default UpdateRecurringPlanDialog;
