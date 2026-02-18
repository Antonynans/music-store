// app/product/[slug]/page.tsx

import { Layout } from "@/components/layout";
import { IProduct } from "@/models/product";
import { SEO } from "@/components/seo";
import { Product } from "@/components/product";
import { products } from "@/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function capitalize_first_letter(string: string) {
  return "AudioStore | " + string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  console.log(slug, 'slug');

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: capitalize_first_letter(product.name),
    description: product.description,
  };
}

// Generate static params (replaces getStaticPaths)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug || "",
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <>
      <Layout>
        <Product product={product} />
      </Layout>
    </>
  );
}