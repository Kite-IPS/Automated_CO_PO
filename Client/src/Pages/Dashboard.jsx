import { useNavigate } from "react-router-dom";
import BaseLayout from "../Layout/BaseLayout";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || "Guest User";
  const navigate = useNavigate();

  return (
    <BaseLayout>
      <div className="w-full h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] flex flex-col items-center pt-8 justify-start text-3xl font-bold">
        <h1 className="w-[80%] md:w-[60%] lg:w-[40%] text-center py-10">
          Welcome {user}..!
          <br />
          to the Automated CO & PO Generator
        </h1>
        <div className="my-5 py-2 w-full flex flex-col md:flex-row items-center justify-center gap-8">
          <button
            className="w-full md:w-auto px-6 py-4 text-xl font-semibold border-2 rounded-xl cursor-pointer border-violet-500 hover:bg-violet-500 hover:text-white transition-all duration-300 dark:border-violet-400 dark:hover:bg-violet-400"
            onClick={() => navigate("/attainment-sheet")}
          >
            Generate Attainment Sheet
          </button>
          <button
            className="w-full md:w-auto px-6 py-4 text-xl font-semibold border-2 rounded-xl cursor-pointer border-violet-500 hover:bg-violet-500 hover:text-white transition-all duration-300 dark:border-violet-400 dark:hover:bg-violet-400"
            onClick={() => navigate("/generate-co-po")}
          >
            Generate CO & PO Calculation
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
