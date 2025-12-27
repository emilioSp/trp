import IRacingLogo from '../assets/iRacing-Stacked-Color-Blue.svg?react';
import trpGT3 from '../assets/trp_gt3.jpeg';
import trpLogo from '../assets/trp_logo.jpeg';

function HomeHeader() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="max-w-6xl mx-auto">
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
    </>
  );
}

export default HomeHeader;
