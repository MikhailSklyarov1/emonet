"use client";
import { Box } from "@mui/material";

interface Props {
  emotion: string;
}

export default function EmotionResult({ emotion }: Props) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        width: "100%",
        textAlign: "center",
        boxShadow: 1,
        fontWeight: "bold",
        color: (theme) => theme.palette.text.primary
      }}
    >
      Итоговая эмоция: <span style={{ fontSize: "1.2em" }}>{emotion}</span>
    </Box>
  );
}
