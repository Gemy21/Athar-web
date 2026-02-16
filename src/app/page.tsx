import { getProducts } from './admin/actions';
import HeroCanvas from '@/components/HeroCanvas';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <HeroCanvas />

      <div className="container" id="products">
        <h2 style={{
          textAlign: 'center',
          marginTop: '80px',
          marginBottom: '50px',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700
        }}>
          Our Collection
        </h2>

        <div className="product-grid">
          {products.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              background: '#111',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                No products available yet. Check back soon.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
