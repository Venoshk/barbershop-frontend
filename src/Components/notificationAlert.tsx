import { useEffect } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { AspectRatio, LinearProgress } from "@mui/joy";

// Definimos as propriedades que nosso alerta vai aceitar
type NotificationProps = {
  open: boolean;
  onClose: () => void;
  severity: "success" | "danger";
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
              ) : (
                <Close/>
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
        
        <LinearProgress
          variant="solid"
          color={severity}
          value={40}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Alert>
    </Box>
  );
}
