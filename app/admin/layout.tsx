import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Admin Page",
  description: "Admin page for the app",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
