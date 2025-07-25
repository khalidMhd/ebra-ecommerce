"use client";

export default function ProgressBar() {
    return (
        < div className="flex items-center justify-center gap-4 mb-10 text-sm font-medium">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
                <span>Shopping Cart</span>
            </div>
            <div className="w-10 border-t border-gray-400"></div>
            <div className="flex items-center gap-2 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">2</div>
                <span>Checkout Details</span>
            </div>
            <div className="w-10 border-t border-gray-400"></div>
            <div className="flex items-center gap-2 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">3</div>
                <span>Order Complete</span>
            </div>
        </div >


    );
}
