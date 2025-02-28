import React, { forwardRef } from "react";
import { StyledInputStyled } from "./styled";

// 확장한 Omit에서 size만 빼서 따로 정의 한다는 의미
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: "default" | "outline" | "filled";
    size?: "small" | "medium" | "large"; // ✅ 우리가 원하는 `size` 타입
    fullWidth?: boolean;
    error?: boolean;
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    return <StyledInputStyled ref={ref} {...props} />;
});
