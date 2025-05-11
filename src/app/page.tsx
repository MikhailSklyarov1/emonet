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
import useEmotionStore, { Lang, ModelId } from "@/store/emotionStore";

const getBorderColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case "positive":
    case "положительная":
      return "#4caf50"; // зелёный
    case "neutral":
    case "нейтральная":
      return "#2196f3"; // синий
    case "negative":
    case "отрицательная":
      return "#f44336"; // красный
    case "mixed":
    case "смешанная":
      return "#ffeb3b"; // жёлтый
    default:
      return "#9e9e9e"; // серый по умолчанию
  }
};

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
  const {
    text,
    emotion,
    model,
    lang,
    votes,
    setText,
    setEmotion,
    setModel,
    setLang,
    setVotes,
  } = useEmotionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setEmotion(null);
    setVotes(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model, lang }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmotion(data.emotion);
        setVotes(data.votes);
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
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        py={5}
      >
        <Typography
          variant="h4"
          sx={{
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Определение эмоции
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Выберите язык</InputLabel>
          <Select
            value={lang}
            label="Выберите язык"
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            <MenuItem key={"ru"} value={"ru"}>
              {"Русский"}
            </MenuItem>
            <MenuItem key={"en"} value={"en"}>
              {"English"}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Выберите модель</InputLabel>
          <Select
            value={model}
            label="Выберите модель"
            onChange={(e) => setModel(e.target.value as ModelId)}
          >
            {modelOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={3}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAnalyze}
          disabled={loading || !text}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Анализировать"
          )}
        </Button>

        {emotion && votes && votes?.length > 0 && (
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {/* Итоговая карточка */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                borderWidth: 1,
                borderStyle: "solid",
                color: (theme) => theme.palette.text.primary,
                width: "100%",
                textAlign: "center",
                boxShadow: 1,
                fontWeight: "bold",
              }}
            >
              Итоговая эмоция:{" "}
              <span style={{ fontSize: "1.2em" }}>{emotion}</span>
            </Box>

            {/* Карточки моделей голосования */}
            {votes && votes.length > 1 && (
              <Box
                display="flex"
                gap={2}
                justifyContent="center"
                flexWrap="wrap"
                width="100%"
              >
                {votes.map((vote, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: 2,
                      borderColor: getBorderColor(vote.category),
                      borderWidth: 1,
                      borderStyle: "solid",
                      boxShadow: 1,
                      color: (theme) => theme.palette.text.primary,
                      p: 2,
                      flex: "1 1 30%",
                      minWidth: "220px",
                      maxWidth: "300px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <strong>Модель:</strong> {vote.model}
                    </div>
                    <div>
                      <strong>Эмоция:</strong> {vote.emotion}
                    </div>
                    <div>
                      <strong>Категория:</strong> {vote.category}
                    </div>
                    <div>
                      <strong>Вес:</strong> {vote.weight}
                    </div>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
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
