import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = () => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Pie chart of your target/balance
          </h4>
        </div>


      </div>

      <div className="flex flex-1 w-full items-center justify-center">
        <div className="h-[285px]">
          <PieChart options={pieChartOptions} series={pieChartData} />
        </div>
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Your Balance</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            23%
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Until target</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            77%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
