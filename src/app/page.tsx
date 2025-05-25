"use client";

import { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";

import useEmotionStore from "@/store/emotionStore";
import EmotionInputForm from "@/components/EmotionInputForm";
import AnalyzeButton from "@/components/AnalyzeButton";
import EmotionResult from "@/components/EmotionResult";
import VoteCards from "@/components/VoteCards";

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
        setError("Ошибка при анализе текста");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} py={5}>
        <Typography variant="h4">Определение эмоции</Typography>

        <EmotionInputForm
          text={text}
          lang={lang}
          model={model}
          onTextChange={setText}
          onLangChange={setLang}
          onModelChange={setModel}
        />

        <AnalyzeButton
          onClick={handleAnalyze}
          loading={loading}
          disabled={loading || !text}
        />

        {emotion && votes && votes.length > 0 && (
          <Box display="flex" flexDirection="column" gap={2} width="100%" alignItems="center">
            <EmotionResult emotion={emotion} />
            <VoteCards votes={votes} />
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
