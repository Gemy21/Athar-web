"use client";

import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import DeleteButton from "./DeleteButton";


interface AdminDashboardProps {
    products: {
        id: number;
        title: string;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        createdAt: Date; // Will be passed as string if serialized manually, but usually Next.js handles it if using standard fetch? No.
        updatedAt: Date;
    }[];
}

export default function AdminDashboard({ products }: { products: any[] }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") { // Simple hardcoded password
            localStorage.setItem("admin_auth", "true");
            setIsAuthenticated(true);
        } else {
            alert("Incorrect Password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-container" style={{ textAlign: "center", marginTop: "100px" }}>
                <h1 style={{ marginBottom: "20px" }}>Admin Login</h1>
                <form onSubmit={handleLogin} className="admin-form" style={{ maxWidth: "400px", margin: "0 auto" }}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: "100%" }}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                <h1>Product Management (CRM)</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("admin_auth");
                        setIsAuthenticated(false);
                    }}
                    className="btn-primary"
                    style={{ background: "#333", border: "1px solid #555" }}
                >
                    Logout
                </button>
            </div>

            <ProductForm />

            <h2 style={{ margin: "40px 0 20px" }}>Current Products ({products.length})</h2>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.title} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                                    ) : (
                                        <span style={{ color: "#666" }}>No img</span>
                                    )}
                                </td>
                                <td>
                                    <strong>{product.title}</strong>
                                    <div style={{ fontSize: "0.8rem", color: "#888" }}>{product.description.substring(0, 30)}...</div>
                                </td>
                                <td style={{ color: "var(--color-gold)" }}>{product.price.toFixed(2)} EGP</td>
                                <td>{product.category}</td>
                                <td>
                                    <DeleteButton id={product.id} />
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", color: "#666", padding: "30px" }}>
                                    No products found. Add one above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
