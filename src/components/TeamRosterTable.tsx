type Props = {
  title: string;
  children?: React.ReactNode;
};

function TeamRosterTable(props: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4 w-full md:max-w-xl mx-auto ring-1 ring-indigo-50">
      <h2 className="text-center text-xl font-semibold mb-4 text-indigo-700">
        {props.title}
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
        <tbody className="text-gray-700">{props.children}</tbody>
      </table>
    </div>
  );
}

export default TeamRosterTable;
