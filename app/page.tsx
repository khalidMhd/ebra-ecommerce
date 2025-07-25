import Banner from '../components/Banner';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/product/ProductList';

export default async function HomePage() {

  return (
    <main>
      <Banner />
      <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <FilterSidebar />
        <ProductList />
      </div>
    </main>

  );
}