import type { MemberData } from '../types/race';

type Props = {
  memberData: MemberData;
};

export function RecentRaces({ memberData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recent Races ({memberData.races.length})
      </h2>

      {memberData.races.length === 0 ? (
        <p className="text-gray-600">No races found for this member.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-50 border-b-2 border-indigo-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  Series
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  Track
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  Date
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                  Start
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                  Finish
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                  Incidents
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                  Strength of Field
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-indigo-700">
                  iRating Change
                </th>
              </tr>
            </thead>
            <tbody>
              {memberData.races.map((race) => {
                const ratingChange = race.newi_rating - race.oldi_rating;
                const ratingChangeColor =
                  ratingChange > 0
                    ? 'text-green-600'
                    : ratingChange < 0
                      ? 'text-red-600'
                      : 'text-gray-600';
                const date = new Date(race.session_start_time);
                const formattedDate = date.toLocaleDateString();

                return (
                  <tr
                    key={race.subsession_id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {race.series_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {race.track.track_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formattedDate}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-gray-800">
                      {race.start_position}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-gray-800">
                      {race.finish_position}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-gray-800">
                      {race.incidents}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-gray-800">
                      {race.strength_of_field}
                    </td>
                    <td
                      className={`px-4 py-3 text-center text-sm font-semibold ${ratingChangeColor}`}
                    >
                      {ratingChange > 0 ? '+' : ''}
                      {ratingChange}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
