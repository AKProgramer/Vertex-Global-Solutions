import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "VertexGlobal. - Admin",
    description: "VertexGlobal. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
