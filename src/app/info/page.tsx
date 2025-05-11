"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Info() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems={"center"}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.text.primary,
            maxWidth: 800
          }}
        >
          Данное приложение реализовано в рамках выпускной квалификационной работы магистра. Цель - определить доминирующую эмоцию в тексте.
          <br/>Необходимо выбрать язык, так как приложение автоматически формирует промпт. Язык промпта должен совпадать с языком текста.
          <br/>Также, нужно указать определенную модель или Голосование моделей. Голосование происходит автоматически с применением заранее найденных весов.
          <br/>И нужно задать сам текст, в котором нужно определить эмоцию. Рекомендуемая длина текста - до 200 символов. Именно на таких текстах 
          высчитывались веса для голосования и программа выдает ожидаемые данные, на текстах длиннее может давать ошибки. К тому же, более длинные тексты 
          имеют много участков с разными эмоциями, которые тяжело свести к одной.

        </Typography>
        <Button sx={{width: 200, marginTop: 2}} onClick={handleNavigate}>На главную</Button>
      </Stack>
    </div>
  );
}
