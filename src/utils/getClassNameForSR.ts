export const getClassNameForSR = (srClass: string) => {
  switch (srClass) {
    case 'Rookie':
      return 'bg-red-100 text-red-800';
    case 'D':
      return 'bg-orange-100 text-orange-800';
    case 'C':
      return 'bg-yellow-100 text-yellow-800';
    case 'B':
      return 'bg-green-100 text-green-800';
    case 'A':
      return 'bg-blue-100 text-blue-800';
    case 'Pro':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
