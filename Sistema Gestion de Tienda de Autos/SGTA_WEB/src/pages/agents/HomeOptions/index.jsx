import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/layout/Header";
import { useAuth } from "../../../context/AuthContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Loading } from "../../../components/ui/Loading";

export const HomeOptionsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return <div className="w-screen h-screen flex items-center justify-center"><Loading /></div>;
  }

  const panels = [
    {
      name: "Ventas",
      icon: <AttachMoneyIcon className="text-white text-4xl" />,
      route: "/sales",
    },
    {
      name: "Autos",
      icon: <DirectionsCarIcon className="text-white text-4xl" />,
      route: "/cars",
    },
    {
      name: "Clientes",
      icon: <GroupsIcon className="text-white text-4xl" />,
      route: "/clients",
    },
  ];

  if (user.role === "admin") {
    panels.push({
      name: "Agentes",
      icon: <SupportAgentIcon className="text-white text-4xl" />,
      route: "/agents",
    });
  }

  return (
    <>
      { user &&(
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Inicio</h1>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${panels.length === 3 ? "3" : "4"} gap-8 place-items-center`}>
                {panels.map((panel, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-8 bg-gray-500 text-white rounded-lg shadow-lg w-60"
                  >
                    <h2 className="text-xl mb-4">{panel.name}</h2>
                    <button
                      onClick={() => navigate(panel.route)}
                      className="mt-6 flex items-center bg-sky-950 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100"
                    >
                      {panel.icon}
                      <span className="ml-2">Ver</span>
                    </button>
                  </div>
                ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
};
