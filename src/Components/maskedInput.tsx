import React from "react";
import { IMaskInput } from "react-imask";
import { TextField, type TextFieldProps } from "@mui/material";

// Definimos as props que nosso componente de máscara vai aceitar
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string; // Adicionamos a prop 'mask' para torná-lo reutilizável
}

// Criamos um 'adapter' que usa React.forwardRef.
// Isso é necessário para que o TextField do MUI consiga se comunicar com o input interno.
const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask} // A máscara é aplicada aqui
        definitions={{
          "#": /[1-9]/, // Define que o '#' na máscara aceita números de 1 a 9
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

// Este é o componente final que você usará no seu formulário
type MaskedInputProps = TextFieldProps & {
  mask: string;
};

export function MaskedInput({ mask, ...props }: MaskedInputProps) {
  return (
    <TextField
      {...props}
      InputProps={{
        // Aqui está a mágica: passamos nosso adapter como o componente de input
        inputComponent: TextMaskAdapter as any,
        // Passamos a máscara e outras props para o nosso adapter
        inputProps: {
          mask: mask,
        },
      }}
    />
  );
}
