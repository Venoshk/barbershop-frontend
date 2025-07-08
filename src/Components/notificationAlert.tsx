import { useEffect } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Warning from '@mui/icons-material/Warning';
import { AspectRatio } from "@mui/joy";

type NotificationProps = {
  open: boolean;
  onClose: () => void;
  severity: "success" | "danger" | "warning";
  title: string;
  message: string;
};

export function NotificationAlert({
  open,
  onClose,
  severity,
  title,
  message,
}: NotificationProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <Box sx={{ position: "fixed", top: 24, right: 24, zIndex: 1500 }}>
      <Alert
        size="lg"
        color={severity}
        variant="solid"
        invertedColors
        startDecorator={
          <AspectRatio
            variant="solid"
            ratio="1"
            sx={{
              minWidth: 40,
              borderRadius: "50%",
              boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
            }}
          >
            <div>
              {severity === "success" ? (
                <Check />
              ) : severity === "warning" ? ( // Adiciona a nova verificação aqui
                <Warning />
              ) : (
                <Close /> // Este é o caso padrão (para 'danger' ou outros)
              )}
            </div>
          </AspectRatio>
        }
        endDecorator={
          <IconButton
            variant="plain"
            sx={{
              "--IconButton-size": "32px",
              transform: "translate(0.5rem, -0.5rem)",
            }}
          >
            <Close />
          </IconButton>
        }
        sx={{ alignItems: "flex-start", overflow: "hidden" }}
      >
        <div>
          <Typography level="title-lg">{title}</Typography>
          <Typography level="body-sm">{message}</Typography>
        </div>
      </Alert>
    </Box>
  );
}
