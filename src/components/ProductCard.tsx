import React from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="product-card">
            <div className="image-container">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span className="placeholder-image">ATHAR</span>
                )}
            </div>
            <div className="info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="price">{product.price.toFixed(2)} EGP</div>
                <button className="btn-primary">View Details</button>
            </div>
        </div>
    );
}
