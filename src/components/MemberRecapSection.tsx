import type { MemberRecap } from '../types/member';

type Props = {
  recapData: MemberRecap;
};

export function MemberRecapSection({ recapData }: Props) {
  return (
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
  );
}
