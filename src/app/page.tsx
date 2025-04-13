"use client";

import { useState } from "react";


import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import useEmotionStore, { ModelId } from "@/store/emotionStore";

const modelOptions = [
  {
    label: "DeepSeek-R1",
    value: "deepseek/deepseek-r1-distill-qwen-32b:free",
  },
  {
    label: "Qwen-32b",
    value: "qwen/qwq-32b:free",
  },
  {
    label: "Mistral Small 3.1",
    value: "mistralai/mistral-small-3.1-24b-instruct:free",
  },
  {
    label: "Голосование моделей",
    value: "voting",
  },
];

export default function Home() {
  const { text, emotion, model, setText, setEmotion, setModel } = useEmotionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setEmotion(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmotion(data.emotion);
      } else {
        setError(data.error || "Ошибка при анализе текста");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} py={5}>
        <Typography variant="h4">Определение эмоции</Typography>

        <TextField
          fullWidth
          label="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Выберите модель</InputLabel>
          <Select value={model} label="Выберите модель" onChange={(e) => setModel(e.target.value as ModelId)}>
            {modelOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAnalyze}
          disabled={loading || !text}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Анализировать"}
        </Button>

        {emotion && (
          <Alert severity="success" sx={{ width: "100%", textAlign: "center" }}>
            Эмоция: <strong>{emotion}</strong>
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ width: "100%", textAlign: "center" }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

