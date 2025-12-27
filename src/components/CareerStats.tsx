import type { MemberCareer } from '../types/member';

type Props = {
  careerData: MemberCareer;
};

export function CareerStats({ careerData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Career Statistics
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-indigo-50 border-b-2 border-indigo-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                Category
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Starts
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Wins
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Top 5
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Poles
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Avg Start
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Avg Finish
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Laps Led
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Win %
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                Top 5 %
              </th>
            </tr>
          </thead>
          <tbody>
            {careerData.stats.map((stat) => (
              <tr
                key={stat.category_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  {stat.category}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {stat.starts}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-green-600">
                  {stat.wins}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-blue-600">
                  {stat.top5}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-purple-600">
                  {stat.poles}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {stat.avg_start_position.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  {stat.avg_finish_position.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-orange-600">
                  {stat.laps_led}
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-indigo-600">
                  {stat.win_percentage.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-cyan-600">
                  {stat.top5_percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
