import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import members from '../../data/trp_members.json';
import { CareerStats } from '../components/CareerStats';
import { IRatingChart } from '../components/IRatingChart';
import { MemberHeader } from '../components/MemberHeader';
import { MemberRecapSection } from '../components/MemberRecapSection';
import { RecentRaces } from '../components/RecentRaces';
import type { MemberChart } from '../types/chart';
import type { MemberCareer, MemberRecap } from '../types/member';
import type { MemberData } from '../types/race';

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

        <MemberHeader memberInfo={memberInfo} />

        {recapData && <MemberRecapSection recapData={recapData} />}

        {careerData && <CareerStats careerData={careerData} />}

        {iRatingChartData && iRatingChartData.data.length > 0 && (
          <IRatingChart iRatingChartData={iRatingChartData} />
        )}

        <RecentRaces memberData={memberData} />
      </div>
    </div>
  );
}

export default MemberDetail;
