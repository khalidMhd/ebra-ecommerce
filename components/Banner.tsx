export default function Banner() {
  return (
    <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('/banner.jpg')` }}>
      <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ibraa</h1>
        <p className="text-lg max-w-xl text-center">Discover beautifully crafted furniture to transform your space</p>
      </div>
    </div>
  );
}