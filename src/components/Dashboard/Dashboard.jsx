// src/pages/DashboardHome.jsx
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
import { Briefcase, CheckCircle, AlertTriangle } from 'lucide-react';
export default function Dashboard() {
  const totalCases = 120;
  const solvedCases = 85;
  const unresolvedCases = 35;

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Cases Solved',
        data: [10, 20, 30, 25, 35],
        backgroundColor: 'rgba(63, 187, 187, 0.2)',
        borderColor: 'rgb(57, 184, 184)',
        borderWidth: 1,
      },
      {
        label: 'Unsolved Cases',
        data: [5, 10, 15, 20, 30],
        backgroundColor: 'rgba(218, 59, 93, 0.2)',
        borderColor: 'rgb(214, 47, 83)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Murder', 'Burglary', 'Assault', 'Theft'],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Crime Rate',
        data: [120, 135, 125, 110, 95],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Cards Section */}
     

    

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 -mt-9">
  {/* Total Cases */}
  <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-between">
    {/* Left Content */}
    <div className="flex items-center space-x-4 z-10">
      <Briefcase className="w-10 h-10 text-blue-600" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Total Cases</h3>
        <p className="text-2xl font-bold text-blue-600">{totalCases}</p>
      </div>
    </div>
    {/* Right Half Circle */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100 rounded-full"></div>
  </div>

  {/* Solved Cases */}
  <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-between">
    <div className="flex items-center space-x-4 z-10">
      <CheckCircle className="w-10 h-10 text-green-600" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Solved Cases</h3>
        <p className="text-2xl font-bold text-green-600">{solvedCases}</p>
      </div>
    </div>
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-green-100 rounded-full"></div>
  </div>

  {/* Unresolved Cases */}
  <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-between">
    <div className="flex items-center space-x-4 z-10">
      <AlertTriangle className="w-10 h-10 text-red-600" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Unresolved Cases</h3>
        <p className="text-2xl font-bold text-red-600">{unresolvedCases}</p>
      </div>
    </div>
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-red-100 rounded-full"></div>
  </div>
</div>


      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-[690px] flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Cases Solved vs Unsolved</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Cases Solved vs Unsolved' },
              },
            }}
          />
        </div>

        {/* Right Column (Pie + Line) */}
        <div className="flex flex-col gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-[340px] flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Crime Distribution by Type</h3>
            <div className="flex-1 relative">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Crime Distribution' },
                  },
                }}
              />
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-[320px] flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">Crime Rate Over Time</h3>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Crime Rate Trend' },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
