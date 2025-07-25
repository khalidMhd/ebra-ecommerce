"use client";

import { TicketPercent } from "lucide-react";

export default function CouponComponent() {

  return (
    <div className="mt-8 p-4  w-2/3 ">
      <h3 className="text-lg font-semibold mb-2">Have a coupon?</h3>
      <p className="text-sm text-gray-500 mb-4">Add your code for an instant cart discount</p>

      <div className="relative w-1/2">
        {/* Left Icon */}
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <TicketPercent className="w-5 h-5" />
        </span>

        {/* Right Button Inside Input */}
        <input
          type="text"
          placeholder="Enter coupon code"
          className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="absolute right-1 top-1/2 -translate-y-1/2 text-black font-bold px-3 py-1 rounded-md text-sm cursor-pointer">
          Apply
        </p>
      </div>
    </div>
  );
}
