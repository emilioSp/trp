import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MemberChart } from '../types/chart';

type Props = {
  iRatingChartData: MemberChart;
};

export function IRatingChart({ iRatingChartData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        iRating Progression
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={iRatingChartData.data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorIRating" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="when"
            stroke="#6b7280"
            tick={{
              fill: '#6b7280',
              fontSize: 12,
            }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{
              fill: '#6b7280',
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{
              color: '#1f2937',
              fontWeight: 'bold',
            }}
            formatter={(value: number | undefined) =>
              value ? `${value.toLocaleString()}` : ''
            }
            labelFormatter={(label: string) => `Date: ${label}`}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              color: '#1f2937',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{
              fill: '#4f46e5',
              r: 5,
              strokeWidth: 2,
              stroke: '#fff',
            }}
            activeDot={{
              r: 7,
              strokeWidth: 2,
            }}
            name="iRating"
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 p-4 bg-indigo-50 rounded">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Current iRating:</span>{' '}
          {iRatingChartData.data[
            iRatingChartData.data.length - 1
          ]?.value.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Peak iRating:</span>{' '}
          {Math.max(
            ...iRatingChartData.data.map((d) => d.value),
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
