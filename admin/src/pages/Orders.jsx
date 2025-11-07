import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

export default function OrdersPage() {
  const orders = [
    {
      id: 153,
      customer: "Арман К.",
      table: 4,
      total: "₸12,500",
      status: "в процессе",
      time: "10:45",
    },
    {
      id: 154,
      customer: "Алия Н.",
      table: 2,
      total: "₸9,300",
      status: "готовится",
      time: "11:10",
    },
    {
      id: 155,
      customer: "Бекзат Т.",
      table: 1,
      total: "₸7,800",
      status: "ожидает",
      time: "11:25",
    },
    {
      id: 156,
      customer: "Динара С.",
      table: 5,
      total: "₸14,200",
      status: "готов",
      time: "11:40",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "готов":
        return "success";
      case "в процессе":
        return "warning";
      case "готовится":
        return "info";
      case "ожидает":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        🧾 Все заказы
      </Typography>

      <Card
        sx={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                  <TableCell sx={{ fontWeight: 600 }}>№ Заказа</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Клиент</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Стол</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Сумма</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Статус</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Время</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                    Действия
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:hover": { backgroundColor: "#fafafa" },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>Стол {order.table}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ textTransform: "capitalize", fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Подробнее">
                        <IconButton color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <IconButton color="warning">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
