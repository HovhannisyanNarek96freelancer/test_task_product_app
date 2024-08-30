import {ProductTable} from "@/components/ProductTable";

const Page = () => {
  return (
      <div>
        <h1 className="m-4 text-4xl md:text-5xl lg:text-6xl text-center">Product Listing</h1>
        <ProductTable />
      </div>
  );
};

export default Page;
