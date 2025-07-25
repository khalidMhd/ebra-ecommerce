import Banner from '../components/Banner';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/product/ProductList';

export default async function HomePage() {

  return (
    <main> 
      {/* <Header /> */}
      <Banner />
      <div className="flex px-8 py-10">
        <FilterSidebar />
        <ProductList />
      </div>
    </main>
  );
}