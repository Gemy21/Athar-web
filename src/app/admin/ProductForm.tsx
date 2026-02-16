"use client";

import { useTransition, useRef } from "react";
import { createProduct } from "./actions";

export default function ProductForm() {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await createProduct(formData);
            formRef.current?.reset();
        });
    };

    return (
        <div className="admin-form">
            <h2 style={{ marginBottom: '20px' }}>Add New Product</h2>
            <form action={handleSubmit} ref={formRef}>
                <div className="form-group">
                    <label htmlFor="title">Product Name</label>
                    <input type="text" name="title" id="title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description (Short details)</label>
                    <textarea name="description" id="description" rows={3} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (EGP)</label>
                    <input type="number" name="price" id="price" step="0.01" required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category (Optional)</label>
                    <input type="text" name="category" id="category" placeholder="e.g. Best Sellers" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image (Maximum 4MB)</label>
                    <input type="file" name="image" id="image" accept="image/*" />
                </div>
                <button type="submit" className="btn-primary" disabled={isPending}>
                    {isPending ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
