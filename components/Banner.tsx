export default function Banner() {
  return (
    <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('/banner.jpg')` }}>
      <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white">
         <h2 className="text-2xl text-black font-semibold">Welcome to Ebra</h2>
        <p className="text-lg text-black  max-w-xl text-center">Discover beautifully crafted furniture to transform your space</p>
      </div>
    </div>
  );
}