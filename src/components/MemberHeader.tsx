import { getClassNameForSR } from '../utils/getClassNameForSR';

type MemberInfo = {
  id: number;
  name: string;
  className: string;
  memberSince: string;
  iRating: number;
  safetyRating: number;
};

type Props = {
  memberInfo: MemberInfo;
};

export function MemberHeader({ memberInfo }: Props) {
  return (
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
  );
}
