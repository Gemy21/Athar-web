"use client";

import { useTransition } from "react";
import { deleteProduct } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="delete-btn"
            onClick={() => startTransition(() => deleteProduct(id))}
            disabled={isPending}
            style={{ opacity: isPending ? 0.5 : 1 }}
        >
            {isPending ? "Deleting..." : "Delete"}
        </button>
    );
}
