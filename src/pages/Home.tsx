import { useNavigate } from "react-router-dom";
import members from "../../data/trp_members.json";
import IRacingLogo from "../assets/iRacing-Stacked-Color-Blue.svg?react";
import { getClassNameForSR } from "../utils/getClassNameForSR.ts";

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
			<IRacingLogo className="icon" />
			<h1 className="text-2xl font-bold text-center mb-2">Team Racing Point Roster</h1>
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
											<td className="px-3 py-2 group-hover:font-semibold transition-all">{m.name}</td>
											<td className="px-3 py-2 text-right flex items-center justify-end gap-2">
												<span
													className={`inline-block px-2 py-0.5 rounded-full ${getClassNameForSR(m.className)} text-sm font-semibold cursor-pointer hover:scale-110 transition-transform`}
												>
													{m.iRating}
												</span>
												<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-600 font-bold">→</span>
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
											<td className="px-3 py-2 group-hover:font-semibold transition-all">{m.name}</td>
											<td className="px-3 py-2 text-right flex items-center justify-end gap-2">
												<span
													className={`inline-block px-2 py-0.5 rounded-full ${getClassNameForSR(m.className)} text-sm font-semibold cursor-pointer hover:scale-110 transition-transform`}
												>
													{m.safetyRating}
												</span>
												<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-600 font-bold">→</span>
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

