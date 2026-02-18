import { Layout } from "@/components/layout";
import { Preview } from "@/components/preview";
import { IProduct } from "@/models/product";
import { routes } from "@/utils/routes";
import { products } from "@/data";
import { Metadata } from "next";

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

  return {
    title: capitalize_first_letter(slug),
    description: `Browse exceptional high quality ${slug} on AudioStore`,
  };
}

// Generate static params (replaces getStaticPaths)
export async function generateStaticParams() {
  const paths = routes
    .filter((route) => route.title !== "home")
    .map((route) => ({
      slug: route.title || "",
    }));

  return paths;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryProducts: IProduct[] = products.filter(
    (product) => product.category === slug
  );

  return (
    <>
      <Layout>
        <div>
          <p className="bg-black text-white h-52 flex items-center justify-center text-4xl uppercase">
            {slug}
          </p>
        </div>
        <div className="mt-12">
          {categoryProducts
            .filter((product) => product.new)
            ?.map((product) => (
              <Preview product={product} key={product.name} />
            ))}
          {categoryProducts
            .filter((product) => !product.new)
            ?.map((product, idx) => (
              <Preview
                product={product}
                key={product.name}
                reverse={idx % 2 === 0}
              />
            ))}
        </div>
      </Layout>
    </>
  );
}