import { useNavigate } from 'react-router-dom';
import members from '../../data/trp_members.json';
import HomeHeader from '../components/HomeHeader.tsx';
import TeamRosterTable from '../components/TeamRosterTable.tsx';
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
      <HomeHeader />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 place-items-center">
            <TeamRosterTable title="iRating">
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
            </TeamRosterTable>

            <TeamRosterTable title="Safety Rating">
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
            </TeamRosterTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
