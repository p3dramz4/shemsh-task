import React from "react";

interface SubmitButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-md text-white font-medium text-[14px]
        ${
          disabled
            ? "bg-btnDisable cursor-not-allowed"
            : "bg-[#d8b248] hover:bg-switcher cursor-pointer"
        }`}>
      خرید طلا
    </button>
  );
};
