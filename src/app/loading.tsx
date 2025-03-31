import { colorSystem } from '@/styles/colorSystem';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div
        className={`${colorSystem.light.background.card} dark:${colorSystem.dark.background.card} p-8 rounded-lg shadow-lg animate-pulse flex flex-col items-center`}
      >
        <div className="w-16 h-16 border-4 border-t-gray-900 border-r-transparent border-b-gray-900 border-l-transparent rounded-full animate-spin dark:border-t-gray-100 dark:border-b-gray-100"></div>
        <span
          className={`mt-6 ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary} font-medium`}
        >
          Loading content...
        </span>
        <p
          className={`mt-2 text-sm ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
        >
          Please wait while we fetch the data for you
        </p>
      </div>
    </div>
  );
}
