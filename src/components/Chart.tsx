import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type ChartProps = {
  data: {
    date: string;
    confirmed: any;
    deaths: any;
    recovered: any;
  }[];
};

const Chart = ({ data }: ChartProps) => {
  return (
    <LineChart width={600} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
      <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
      <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
    </LineChart>
  )
}

export default Chart