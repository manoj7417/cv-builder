"use client"
import { GetTokens } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PsychometricTest() {
    const [loading , setIsLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState([]);

    const fetchSummary = async () => {
        const { accessToken } = await GetTokens();
        const token = accessToken?.value;
        try {
            const response = await axios.get("/api/getSummary", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (response.status === 200) {
                setPopupData(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <section className="w-full h-full py-10 px-12">
            <h1 className="text-blue-900 lg:text-3xl text-xl  font-bold">
                Psychometric Test Summary
            </h1>
            <div className="summary_cards_wrapper">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
                    {loading ? (
                        Array(5)
                            .fill()
                            .map((_, index) => (
                                <div
                                    className="w-full md:w-[350px] mr-0 md:mr-10 my-4 flex-1"
                                    key={index}
                                >
                                    <Skeleton width="100%" height={200} />
                                </div>
                            ))
                    ) : popupData?.length === 0 ? (
                        <div className="w-full md:w-[350px] mr-0 md:mr-10 my-4">
                            <Card className="w-full h-[200px] flex items-center justify-center">
                                <span>No Test Summary data yet</span>
                            </Card>
                        </div>
                    ) : (
                        popupData?.map((val, index) => (
                            <div className="summary_cards relative" key={index}>
                                <div className="w-full md:w-[250px] p-4 sm:p-6 min-h-[220px] bg-white border border-gray-200 rounded-lg shadow">
                                    <a href="#">
                                        <h5 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">
                                            User Summary
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-sm text-gray-700">
                                        Interests: {val.summary.interests.slice(0, 100)}
                                    </p>
                                </div>

                                <div className="summary_card_footer absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                                    <div
                                        className="inline-flex items-center px-2 py-2 text-sm text-white bg-blue-950 rounded-md cursor-pointer"
                                        onClick={() => handleReadMore(val)}
                                    >
                                        Read more
                                        <svg
                                            className="rtl:rotate-180 w-2.5 h-2.5 ms-2 mt-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {showPopup && popupData && (
                        <div className="fixed top-0 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
                            <div className="bg-white max-w-full md:max-w-5xl w-full p-4 md:p-6 rounded-lg shadow-lg relative">
                                <button
                                    onClick={closePopup}
                                    className="absolute top-[1rem] right-[1rem] text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <Tabs className="w-full py-5">
                                    <TabsList className="mb-4 flex w-full justify-center flex-wrap h-auto">
                                        <TabsTrigger
                                            value="actionableInsights"
                                            className="text-blue-950 rounded-md text-base"
                                        >
                                            Actionable Insights
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="careerSuggestions"
                                            className="text-blue-950 rounded-md text-base"
                                        >
                                            Career Suggestions
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="summary"
                                            className="text-blue-950 rounded-md text-base"
                                        >
                                            Summary
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="actionableInsights" className="mb-4">
                                        <div className="actions_section max-w-full md:max-w-4xl mx-auto">
                                            <div>
                                                <h2 className="text-xl font-bold mb-6 text-blue-950">
                                                    Actionable Insights
                                                </h2>
                                                <ul className="space-y-3 text-sm">
                                                    {Object.entries(cardData?.actionableInsights).map(
                                                        ([key, value], idx) => (
                                                            <li key={idx}>
                                                                <strong>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                    :
                                                                </strong>{" "}
                                                                <p>{value}</p>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent className="mb-6" value="careerSuggestions">
                                        <div className="career_section max-w-full md:max-w-4xl mx-auto">
                                            <div className="space-y-3">
                                                <h2 className="text-xl font-bold text-blue-950 flex items-center gap-3">
                                                    Career Suggestions
                                                </h2>
                                                <ul className="space-y-3 text-sm">
                                                    {cardData?.careerSuggestions?.map(
                                                        (career, index) => (
                                                            <li key={index} className="py-2 space-y-2">
                                                                <strong>Career:</strong> {career.career}
                                                                <br />
                                                                <strong>Reason:</strong> {career.reason}
                                                                <br />
                                                                <strong>Actions:</strong> {career.actions}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent className="mb-6" value="summary">
                                        <div className="max-w-full md:max-w-4xl mx-auto summary_section">
                                            <div>
                                                <h2 className="text-xl font-bold mb-6 text-blue-950">
                                                    Summary
                                                </h2>
                                                <ul className="space-y-3 text-sm">
                                                    {Object.entries(cardData?.summary).map(
                                                        ([key, value], idx) => (
                                                            <li key={idx}>
                                                                <strong>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                    :
                                                                </strong>{" "}
                                                                <p>{value}</p>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PsychometricTest