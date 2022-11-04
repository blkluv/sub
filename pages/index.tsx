import Dashboard from "../components/Dashboard";
import PrivateLayout from "../components/Layout";

export default function Home() {
  return (
    <PrivateLayout>
      <Dashboard />
    </PrivateLayout>
  );
}
