import { getProducts } from './actions';
import AdminDashboard from './AdminDashboard';

export const revalidate = 0; // Ensure fresh data on every request

export default async function AdminPage() {
    const data = await getProducts();

    // Serialize Date objects to strings for Client Component
    const products = data.map((product) => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    }));

    return <AdminDashboard products={products} />;
}
