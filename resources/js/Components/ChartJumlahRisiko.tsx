import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const chartConfig = {
  total: {
    label: "Jumlah Risiko",
    color: "green",
  },
} satisfies ChartConfig;

export const ChartJumlahRisiko = () => {
  const { data_chart } = usePage<
    PageProps<{
      data_chart: Array<{ day: string; total: number }>;
    }>
  >().props;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data_chart}
        margin={{
          left: 0,
          right: 50,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={3}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Area
          dataKey="total"
          type="monotone"
          fillOpacity={0.4}
          stroke="green"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
