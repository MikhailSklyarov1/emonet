"use client";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Lang, ModelId } from "@/store/emotionStore";

interface Props {
  text: string;
  lang: Lang;
  model: ModelId;
  onTextChange: (value: string) => void;
  onLangChange: (value: Lang) => void;
  onModelChange: (value: ModelId) => void;
}

const modelOptions = [
  { label: "DeepSeek-R1", value: "deepseek/deepseek-r1-distill-qwen-32b:free" },
  { label: "Qwen-32b", value: "qwen/qwq-32b:free" },
  {
    label: "Mistral Small 3.1",
    value: "mistralai/mistral-small-3.1-24b-instruct:free",
  },
  { label: "Голосование моделей", value: "voting" },
];

export default function EmotionInputForm({
  text,
  lang,
  model,
  onTextChange,
  onLangChange,
  onModelChange,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <FormControl fullWidth>
        <InputLabel>Выберите язык</InputLabel>
        <Select
          value={lang}
          label="Выберите язык"
          onChange={(e) => onLangChange(e.target.value as Lang)}
        >
          <MenuItem value="ru">Русский</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Выберите модель</InputLabel>
        <Select
          value={model}
          label="Выберите модель"
          onChange={(e) => onModelChange(e.target.value as ModelId)}
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
        onChange={(e) => onTextChange(e.target.value)}
        multiline
        rows={3}
      />
    </Box>
  );
}
