import { useNavigate } from 'react-router-dom';
import members from '../../data/trp_members.json';
import IRacingLogo from '../assets/iRacing-Stacked-Color-Blue.svg?react';
import trpGT3 from '../assets/trp_gt3.jpeg';
import trpLogo from '../assets/trp_logo.jpeg';
import { getClassNameForSR } from '../utils/getClassNameForSR.ts';

function Home() {
  const navigate = useNavigate();

  // Table 1: iRating rank
  const iRatingRank = [...members].sort((a, b) => b.iRating - a.iRating);
  // Table 2: safetyRating rank (classOrder desc, then safetyRating desc)
  const safetyRank = [...members].sort((a, b) => {
    if (b.classOrder !== a.classOrder) return b.classOrder - a.classOrder;
    return b.safetyRating - a.safetyRating;
  });

  const handleRowClick = (memberId: number) => {
    navigate(`/member/${memberId}`);
  };

  return (
    <>
      {/* Logo Section with Enhanced Design */}
      <div className="bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Logos */}
          <div
            className="grid gap-8 mb-5 items-center"
            style={{ gridTemplateColumns: '5fr auto 5fr' }}
          >
            <div className="grid justify-end transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-4 shadow-2xl hover:shadow-indigo-500/50 transition-shadow duration-300 border-2 border-gray-200 hover:border-indigo-400">
                <IRacingLogo className="w-20" />
              </div>
            </div>
            <div className="grid place-items-center text-gray-300 text-4xl font-light">
              ×
            </div>
            <div className="grid justify-start transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-4 shadow-2xl hover:shadow-indigo-500/50 transition-shadow duration-300 border-2 border-gray-200 hover:border-indigo-400">
                <img src={trpLogo} className="w-20" alt="trp-logo" />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="grid place-items-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-indigo-500/50 transition-shadow duration-300 border-2 border-indigo-500/50">
                <img src={trpGT3} className="w-78" alt="trp-gt3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-50"></div>
        <h1 className="relative text-4xl font-black text-center mb-2 bg-gradient-to-r from-indigo-600 to-indigo-900 bg-clip-text text-transparent drop-shadow-lg">
          Team Racing Point
        </h1>
        <h2 className="relative text-2xl font-bold text-center text-indigo-600 tracking-wider">
          ROSTER
        </h2>
      </div>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* center the grid on the page */}
          <div className="grid gap-8 md:grid-cols-2 place-items-center">
            {/* center grid items both horizontally and vertically */}
            {/* iRating Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow p-4 w-full md:max-w-xl mx-auto ring-1 ring-indigo-50">
              {/* constrain card width and center card */}
              <h2 className="text-center text-xl font-semibold mb-4 text-indigo-700">
                iRating
              </h2>
              <table className="w-full table-auto text-left">
                <thead className="bg-gradient-to-r from-indigo-50 to-white text-indigo-700">
                  <tr>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {iRatingRank.map((m, idx) => (
                    <tr
                      key={m.id}
                      onClick={() => handleRowClick(m.id)}
                      className="border-b border-gray-100 even:bg-indigo-50/30 hover:bg-indigo-200 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                    >
                      <td className="px-3 py-2 font-medium w-12">{idx + 1}</td>
                      <td className="px-3 py-2 group-hover:font-semibold transition-all">
                        {m.name}
                      </td>
                      <td className="px-3 py-2 text-right flex items-center justify-end gap-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full ${getClassNameForSR(m.className)} text-sm font-semibold cursor-pointer hover:scale-110 transition-transform`}
                        >
                          {m.iRating}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-600 font-bold">
                          →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Safety Rating Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow p-4 w-full md:max-w-xl mx-auto ring-1 ring-indigo-50">
              {/* constrain card width and center card */}
              <h2 className="text-center text-xl font-semibold mb-4 text-indigo-700">
                Safety Rating
              </h2>
              <table className="w-full table-auto text-left">
                {/* vibrant table styles */}
                <thead className="bg-gradient-to-r from-indigo-50 to-white text-indigo-700">
                  <tr>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {safetyRank.map((m, idx) => (
                    <tr
                      key={m.id}
                      onClick={() => handleRowClick(m.id)}
                      className="border-b border-gray-100 even:bg-indigo-50/30 hover:bg-indigo-200 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                    >
                      <td className="px-3 py-2 font-medium w-12">{idx + 1}</td>
                      <td className="px-3 py-2 group-hover:font-semibold transition-all">
                        {m.name}
                      </td>
                      <td className="px-3 py-2 text-right flex items-center justify-end gap-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full ${getClassNameForSR(m.className)} text-sm font-semibold cursor-pointer hover:scale-110 transition-transform`}
                        >
                          {m.safetyRating}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-600 font-bold">
                          →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
