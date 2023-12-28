import { theme } from "@/app/theme";
import { faker } from "@faker-js/faker";
import { Paper } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Vendas nos últimos 6 meses.",
    },
  },
};

const labels = Array.from({ length: 6 }, (_, index) => {
  const date = addMonths(new Date(), -index);
  return format(date, "MMMM", { locale: ptBR });
}).reverse();

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: theme.palette.info.main,
      backgroundColor: theme.palette.primary.main,
      fill: true,
    },
  ],
};

export const Graphic = () => {
  return (
    <>
      <Paper sx={{ p: 2 }} elevation={24}>
        <Line options={options} data={data} />
      </Paper>
    </>
  );
};
