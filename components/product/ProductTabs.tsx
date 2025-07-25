"use client";

import { useState } from "react";
import { RenderStars } from "../renderStars";
import { Send } from "lucide-react";

const mockReviews = [
    {
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=10",
        rating: 4,
        comment: "Great quality! Definitely worth the price.",
    },
    {
        name: "Mark Lee",
        avatar: "https://i.pravatar.cc/150?img=20",
        rating: 5,
        comment: "Arrived fast and fits perfectly!",
    },
    {
        name: "Sophie Kim",
        avatar: "https://i.pravatar.cc/150?img=32",
        rating: 3,
        comment: "Decent, but colors looked a bit different.",
    },
];

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState<"info" | "questions" | "reviews">("reviews");
    const [reviewInput, setReviewInput] = useState("");

    const handleSubmitReview = () => {
        if (reviewInput.trim()) {
            alert("Review submitted: " + reviewInput);
            setReviewInput("");
        }
    };

    return (
        <div className="mt-1 mx-auto p-6">
            {/* Tab Buttons */}
            <div className="flex space-x-6 border-b pb-3 mb-6">
                <button
                    className={`text-sm font-medium ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-600 pb-2" : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("info")}
                >
                    Additional Info
                </button>
                <button
                    className={`text-sm font-medium ${activeTab === "questions"
                        ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("questions")}
                >
                    Questions
                </button>
                <button
                    className={`text-sm font-medium ${activeTab === "reviews"
                        ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews ({mockReviews.length})
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "info" && (
                <div className="text-gray-700 space-y-4">
                    <p>• Material: 100% Cotton</p>
                    <p>• Fit Type: Slim Fit</p>
                    <p>• Care Instructions: Machine wash cold, dry flat</p>
                </div>
            )}

            {activeTab === "questions" && (
                <div className="space-y-4 text-gray-700">
                    <p>
                        <strong>Q:</strong> Is this true to size? <br />
                        <strong>A:</strong> Yes, fits as expected. Refer to the size chart above.
                    </p>
                    <p>
                        <strong>Q:</strong> Is it machine washable? <br />
                        <strong>A:</strong> Yes, but use cold wash and avoid tumble drying.
                    </p>
                </div>
            )}

            {activeTab === "reviews" && (
                <div className="space-y-6">
                    <h1 className="text-1xl font-bold text-gray-800">Customer Reviews</h1>
                    <div className="flex items-center">
                        <div className="flex">{RenderStars(3)}</div>
                        <div className="text-sm text-gray-600">({11} reviews)</div>
                    </div>
                    {/* Review Input */}
                    <div className="flex items-center border rounded-full overflow-hidden px-4 py-2 shadow-sm">
                        <input
                            type="text"
                            placeholder="Write a review..."
                            value={reviewInput}
                            onChange={(e) => setReviewInput(e.target.value)}
                            className="flex-1 outline-none text-sm"
                        />
                        <button
                            onClick={handleSubmitReview}
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-6">

                        {mockReviews.map((review, index) => (
                            <div key={index} className="flex space-x-4">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{review.name}</p>
                                    <div className="flex items-center mb-1">
                                        {RenderStars(review.rating)}
                                    </div>
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
