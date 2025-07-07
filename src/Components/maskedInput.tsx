import React from "react";
import { IMaskInput } from "react-imask";
import { TextField, type TextFieldProps } from "@mui/material";
import type { CustomProps } from "../Interface/CustomProps";

const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

type MaskedInputProps = TextFieldProps & {
  mask: string;
};

export function MaskedInput({ mask, ...props }: MaskedInputProps) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: TextMaskAdapter as any,

        inputProps: {
          mask: mask,
        },
      }}
    />
  );
}
