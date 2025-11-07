import React from "react";
import { Card, CardContent, Typography, Box, Grid, List, ListItem, ListItemText, Divider} from "@mui/material";
import { ShoppingCart, AttachMoney, TableBar, PersonAdd } from "@mui/icons-material";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const stats = [
    { title: "Всего заказов", value: 132, color: "#ff9f0a", icon: <ShoppingCart /> },
    { title: "Выручка за день", value: "₸ 142,000", color: "#00b894", icon: <AttachMoney /> },
    { title: "Активных столиков", value: 8, color: "#0984e3", icon: <TableBar /> },
    { title: "Новых клиентов", value: 19, color: "#6c5ce7", icon: <PersonAdd /> },
  ];
  const data = [
    { day: "Пн", orders: 25 },
    { day: "Вт", orders: 30 },
    { day: "Ср", orders: 27 },
    { day: "Чт", orders: 40 },
    { day: "Пт", orders: 45 },
    { day: "Сб", orders: 70 },
    { day: "Вс", orders: 55 },
  ];

  return <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "28px",
      }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Card
            style={{
              borderRadius: "14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              borderTop: `5px solid ${stat.color}`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            }}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: stat.color,
                    fontWeight: 700,
                    marginTop: "10px",
                  }}
                >
                  {stat.value}
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: `${stat.color}15`,
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 32 } })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
    </div>
    <Box sx={{ mt: 4 }}>
  {/* График и уведомления */}
  <Grid container spacing={3} alignItems="stretch">
  {/* === ГРАФИК === */}
    <Grid item xs={12} md={8} sx={{display: "flex"}}>
      <Card
        sx={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          p: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            📊 Статистика заказов за неделю
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#7E75FF"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* === УВЕДОМЛЕНИЯ === */}
    <Grid item xs={12} md={4} sx={{display: "flex"}}>
      <Card
        sx={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          p: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            🔔 Уведомления
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Новый заказ от Армана"
                secondary="2 минуты назад"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Бронь стола №3 на 19:00"
                secondary="10 минут назад"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Заказ №142 готов"
                secondary="30 минут назад"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={6} sx={{display: "flex"}}>
      <Card
        sx={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          p: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            👨‍🍳 Персонал
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Иванов А." secondary="Повар — в смене" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Сидорова Н." secondary="Официант — на заказе" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Петров И." secondary="Бармен — свободен" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={6} sx={{display: "flex"}}>
      <Card
        sx={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          p: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            🧾 Активные заказы
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Заказ №153" secondary="Стол #4 — в процессе" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Заказ №154" secondary="Стол #2 — готовится" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Заказ №155" secondary="Стол #1 — ожидает" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
  </Grid>


</Box>

  </>;
}
