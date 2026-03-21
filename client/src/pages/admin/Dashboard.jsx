import React, { useContext, useEffect, useState } from "react";
import { Ticket, DollarSign, Users, Film } from "lucide-react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, showsRes] = await Promise.all([
        axios.get(backendUrl + "/api/booking/stats"),
        axios.get(backendUrl + "/api/show/list")
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      if (showsRes.data.success) {
        setShows(showsRes.data.shows);
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign className="text-emerald-500" size={24} />,
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Bookings",
      value: stats?.bookingsCount || 0,
      icon: <Ticket className="text-blue-500" size={24} />,
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Shows",
      value: stats?.showsCount || 0,
      icon: <Film className="text-purple-500" size={24} />,
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Users",
      value: stats?.usersCount || 0,
      icon: <Users className="text-orange-500" size={24} />,
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your admin control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition backdrop-blur-md"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-400 font-medium mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Active Shows</h2>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Top 5 Recent</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-sm uppercase tracking-wider text-gray-400">
                <th className="p-4 font-medium">Movie</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Occupancy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {shows.slice(0, 5).map((show, idx) => {
                const occupancy = Object.keys(show.occupiedSeats || {}).length;
                return (
                  <tr key={show._id || idx} className="hover:bg-white/5 transition">
                    <td className="p-4 flex items-center gap-4 min-w-[250px]">
                      <img
                        src={show.movie.poster_path}
                        alt={show.movie.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-semibold line-clamp-1">
                        {show.movie.title}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 min-w-[150px]">
                      {show.date} at {show.time}
                    </td>
                    <td className="p-4 text-red-500 font-medium min-w-[100px]">
                      ${show.showPrice}
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-2">
                         <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500" 
                              style={{ width: `${Math.min((occupancy / 100) * 100, 100)}%` }}
                            />
                         </div>
                         <span>{occupancy} seats</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
