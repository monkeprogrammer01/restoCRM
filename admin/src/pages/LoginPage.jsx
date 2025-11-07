import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [focusField, setFocusField] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          padding: "40px 50px",
          width: "480px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* === ПЕРСОНАЖ === */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: focusField === "password" ? -5 : -20 }}
          transition={{ duration: 0.4 }}
          style={{
            width: "110px",
            height: "110px",
            margin: "0 auto 15px",
          }}
        >
          <svg viewBox="0 0 100 100" width="110" height="110">
            {/* Голова */}
            <circle cx="50" cy="50" r="40" fill="#ff9f0a" />
            {/* Глаза */}
            <motion.circle
              cx="35"
              cy="45"
              r={focusField === "password" ? "1" : "3"}
              fill="#2e2e2e"
              animate={{ cy: focusField === "email" ? 43 : 45 }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              cx="65"
              cy="45"
              r={focusField === "password" ? "1" : "3"}
              fill="#2e2e2e"
              animate={{ cy: focusField === "email" ? 43 : 45 }}
              transition={{ duration: 0.2 }}
            />
            {/* Рот */}
            <motion.path
              d={
                focusField === "password"
                  ? "M35 65 Q50 60 65 65"
                  : "M35 65 Q50 72 65 65"
              }
              stroke="#2e2e2e"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>
        </motion.div>

        {/* === ТЕКСТ === */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Добро пожаловать 👋
        </Typography>
        <Typography variant="body2" sx={{ color: "#555", mb: 3 }}>
          Войдите в систему ресторана
        </Typography>

        {/* === ФОРМА === */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          onFocus={() => setFocusField("email")}
          onBlur={() => setFocusField("")}
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          onFocus={() => setFocusField("password")}
          onBlur={() => setFocusField("")}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#ff9f0a",
            color: "#fff",
            fontWeight: 600,
            fontSize: "16px",
            py: 1.4,
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ffb340",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px rgba(255,159,10,0.3)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Войти
        </Button>

        {/* === Подпись === */}
        <Typography
          variant="body2"
          sx={{ mt: 3, color: "#777" }}
        >
          Нет аккаунта? <span style={{ color: "#ff9f0a", cursor: "pointer" }}>Зарегистрироваться</span>
        </Typography>
      </Box>
    </Box>
  );
}
