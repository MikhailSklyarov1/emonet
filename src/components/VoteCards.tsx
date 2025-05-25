"use client";
import { Vote } from "@/store/emotionStore";
import { Box } from "@mui/material";



interface Props {
  votes: Vote[];
}

const getBorderColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case "positive":
    case "положительная":
      return "#4caf50";
    case "neutral":
    case "нейтральная":
      return "#2196f3";
    case "negative":
    case "отрицательная":
      return "#f44336";
    case "mixed":
    case "смешанная":
      return "#ffeb3b";
    default:
      return "#9e9e9e";
  }
};

export default function VoteCards({ votes }: Props) {
  if (votes.length <= 1) return null;

  return (
    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" width="100%">
      {votes.map((vote, index) => (
        <Box
          key={vote.emotion + index}
          sx={{
            borderRadius: 2,
            borderColor: getBorderColor(vote.category),
            borderWidth: 1,
            borderStyle: "solid",
            boxShadow: 1,
            p: 2,
            flex: "1 1 30%",
            minWidth: "220px",
            maxWidth: "300px",
            textAlign: "center",
            color: (theme) => theme.palette.text.primary
          }}
        >
          <div><strong>Модель:</strong> {vote.model}</div>
          <div><strong>Эмоция:</strong> {vote.emotion}</div>
          <div><strong>Категория:</strong> {vote.category}</div>
          <div><strong>Вес:</strong> {vote.weight}</div>
        </Box>
      ))}
    </Box>
  );
}
