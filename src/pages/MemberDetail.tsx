import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import members from '../../data/trp_members.json';
import { getClassNameForSR } from '../utils/getClassNameForSR.ts';

interface Race {
  season_id: number;
  series_id: number;
  series_name: string;
  car_id: number;
  car_class_id: number;
  livery: {
    car_id: number;
    pattern: number;
    color1: string;
    color2: string;
    color3: string;
  };
  license_level: number;
  session_start_time: string;
  winner_group_id: number;
  winner_name: string;
  winner_helmet: {
    pattern: number;
    color1: string;
    color2: string;
    color3: string;
    face_type: number;
    helmet_type: number;
  };
  winner_license_level: number;
  start_position: number;
  finish_position: number;
  qualifying_time: number;
  laps: number;
  laps_led: number;
  incidents: number;
  points: number;
  strength_of_field: number;
  subsession_id: number;
  old_sub_level: number;
  new_sub_level: number;
  oldi_rating: number;
  newi_rating: number;
  track: {
    track_id: number;
    track_name: string;
  };
  drop_race: boolean;
  season_year: number;
  season_quarter: number;
  race_week_num: number;
}

interface MemberData {
  races: Race[];
}

interface RecapStats {
  starts: number;
  wins: number;
  top5: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  favorite_car: {
    car_id: number;
    car_name: string;
    car_image: string;
  };
  favorite_track: {
    config_name: string | null;
    track_id: number;
    track_logo: string;
    track_name: string;
  };
}

interface MemberRecap {
  year: number;
  stats: RecapStats;
  success: boolean;
  season: string | null;
  cust_id: number;
}

interface CareerStat {
  category_id: number;
  category: string;
  starts: number;
  wins: number;
  top5: number;
  poles: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  avg_incidents: number;
  avg_points: number;
  win_percentage: number;
  top5_percentage: number;
  laps_led_percentage: number;
  poles_percentage: number;
}

interface MemberCareer {
  stats: CareerStat[];
}

interface ChartDataPoint {
  when: string;
  value: number;
}

interface MemberChart {
  blackout: boolean;
  category_id: number;
  chart_type: number;
  data: ChartDataPoint[];
  success: boolean;
  cust_id: number;
}

function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [recapData, setRecapData] = useState<MemberRecap | null>(null);
  const [careerData, setCareerData] = useState<MemberCareer | null>(null);
  const [iRatingChartData, setIRatingChartData] = useState<MemberChart | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get member info from the members list
  const memberInfo = members.find((m) => m.id === Number(id));

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        if (!id) {
          setError('Member ID not found');
          return;
        }

        // Import the JSON file dynamically
        const data = await import(`../../data/trp_member_${id}.json`);
        setMemberData(data.default);

        // Try to load recap data
        try {
          const recap = await import(
            `../../data/trp_member_${id}_recap_2025.json`
          );
          setRecapData(recap.default);
        } catch {
          console.log(`Recap data not available for member ${id}`);
        }

        // Try to load career data
        try {
          const career = await import(
            `../../data/trp_member_${id}_career.json`
          );
          setCareerData(career.default);
        } catch {
          console.log(`Career data not available for member ${id}`);
        }

        // Try to load iRating chart data
        try {
          const chart = await import(
            `../../data/trp_member_${id}_irating_chart.json`
          );
          setIRatingChartData(chart.default);
        } catch {
          console.log(`Chart data not available for member ${id}`);
        }

        setLoading(false);
      } catch (err) {
        setError(`Failed to load member data for ID: ${id}`);
        console.error(err);
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            type={'button'}
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ← Back to Home
          </button>
          <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>
        </div>
      </div>
    );
  }

  if (!memberData || !memberInfo) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            type={'button'}
            onClick={() => navigate('/')}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ← Back to Home
          </button>
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded">
            Member not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          type={'button'}
          onClick={() => navigate('/')}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          ← Back to Home
        </button>

        {/* Member Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {memberInfo.name}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className={`p-4 rounded ${getClassNameForSR(memberInfo.className)}`}
            >
              <p className="text-gray-600 text-sm">Member ID</p>
              <p className="text-2xl font-bold">{memberInfo.id}</p>
            </div>
            <div
              className={`p-4 rounded ${getClassNameForSR(memberInfo.className)}`}
            >
              <p className="text-gray-600 text-sm">Member Since</p>
              <p className="text-2xl font-bold">
                {new Date(memberInfo.memberSince).toLocaleDateString()}
              </p>
            </div>
            <div
              className={`p-4 rounded ${getClassNameForSR(memberInfo.className)}`}
            >
              <p className="text-gray-600 text-sm">iRating</p>
              <p className={`text-2xl font-bold`}>{memberInfo.iRating}</p>
            </div>
            <div
              className={`p-4 rounded ${getClassNameForSR(memberInfo.className)}`}
            >
              <p className="text-gray-600 text-sm">Safety Rating</p>
              <p className="text-2xl font-bold">{memberInfo.safetyRating}</p>
            </div>
            <div
              className={`p-4 rounded ${getClassNameForSR(memberInfo.className)}`}
            >
              <p className="text-gray-600 text-sm">License Class</p>
              <p className="text-2xl font-bold">{memberInfo.className}</p>
            </div>
          </div>
        </div>

        {/* Member Recap */}
        {recapData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2025 Season Recap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Starts</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {recapData.stats.starts}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Wins</p>
                  <p className="text-2xl font-bold text-green-600">
                    {recapData.stats.wins}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Top 5</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {recapData.stats.top5}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Laps Led</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {recapData.stats.laps_led}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Avg Start Position</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {recapData.stats.avg_start_position}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">Avg Finish Position</p>
                  <p className="text-2xl font-bold text-red-600">
                    {recapData.stats.avg_finish_position}
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded col-span-2">
                  <p className="text-gray-600 text-sm">Total Laps</p>
                  <p className="text-2xl font-bold text-cyan-600">
                    {recapData.stats.laps}
                  </p>
                </div>
              </div>

              {/* Favorite Car and Track */}
              <div className="space-y-4">
                {recapData.stats.favorite_car && (
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded">
                    <p className="text-gray-600 text-sm mb-2">Favorite Car</p>
                    <p className="text-lg font-bold text-gray-800">
                      {recapData.stats.favorite_car.car_name}
                    </p>
                    {recapData.stats.favorite_car.car_image && (
                      <img
                        src={recapData.stats.favorite_car.car_image}
                        alt={recapData.stats.favorite_car.car_name}
                        className="mt-2 h-32 object-cover rounded"
                      />
                    )}
                  </div>
                )}

                {recapData.stats.favorite_track && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded">
                    <p className="text-gray-600 text-sm mb-2">Favorite Track</p>
                    <p className="text-lg font-bold text-gray-800">
                      {recapData.stats.favorite_track.track_name}
                    </p>
                    {recapData.stats.favorite_track.track_logo && (
                      <img
                        src={recapData.stats.favorite_track.track_logo}
                        alt={recapData.stats.favorite_track.track_name}
                        className="mt-2 h-16 object-contain"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Career Stats */}
        {careerData && (
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
                  {careerData.stats.map((stat, idx) => (
                    <tr
                      key={idx}
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
        )}

        {/* iRating Chart */}
        {iRatingChartData && iRatingChartData.data.length > 0 && (
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
        )}

        {/* Recent Races */}
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
                  {memberData.races.map((race, idx) => {
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
                        key={idx}
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
      </div>
    </div>
  );
}

export default MemberDetail;
