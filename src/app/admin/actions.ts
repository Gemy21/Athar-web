"use server";

import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string || "General";
    const file: File | null = formData.get("image") as unknown as File;

    let imageUrl = "";

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure unique filename and safe path
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = join(process.cwd(), "public", "uploads");
        const path = join(uploadDir, filename);

        // Ensure uploads directory exists (just in case)
        try {
            await writeFile(path, buffer);
            imageUrl = `/uploads/${filename}`;
        } catch (e) {
            console.error("Failed to upload image:", e);
            // Fallback or error handling if necessary
        }
    }

    await prisma.product.create({
        data: {
            title,
            description,
            price,
            imageUrl,
            category,
        },
    });

    revalidatePath("/admin");
    revalidatePath("/");
}

export async function deleteProduct(id: number) {
    await prisma.product.delete({
        where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/");
}

export async function getProducts() {
    // Use Prisma v5 syntax or basic fetch
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
}
