"use client";
import { useRouter } from "next/navigation";

export default function Settings() {
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
      Настройки
      <button onClick={handleNavigate}>На главную</button>
    </div>
  );
}
