import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "VertexGlobal. - Store Dashboard",
    description: "VertexGlobal. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
