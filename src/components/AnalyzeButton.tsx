"use client";
import { Button, CircularProgress } from "@mui/material";

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function AnalyzeButton({ onClick, loading, disabled }: Props) {
  return (
    <Button variant="contained" color="primary" onClick={onClick} disabled={disabled}>
      {loading ? <CircularProgress size={24} color="inherit" /> : "Анализировать"}
    </Button>
  );
}
