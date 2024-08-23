"use client"
import { GetTokens } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CVanalysis() {
    const [analysisData, setAnalysisData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserAnalysisHistory = async () => {
        const { accessToken } = await GetTokens();
        try {
            const response = await axios.get("/api/userCvAnalysis", {
                headers: {
                    Authorization: "Bearer " + accessToken.value,
                },
            });
            if (response.status === 200) {
                setAnalysisData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleUserAnalysis = (id) => {
        router.push(`/analyser/${id}`);
    };

    useEffect(() => {
        fetchUserAnalysisHistory();
    }, []);
    return (
        <section className="w-full py-10 px-12">
            <h1 className="text-blue-900 text-3xl font-bold">
                CV Analyser History
            </h1>
            <div className="flex flex-wrap">
                {loading ? (
                    Array(5)
                        .fill()
                        .map((_, index) => (
                            <div className="lg:w-[350px] w-full  my-4 flex-1" key={index}>
                                <Skeleton width="100%" height={200} />
                            </div>
                        ))
                ) : analysisData.length === 0 ? (
                    <div className="lg:w-[350px] w-full  my-4">
                        <Card className="w-full h-[200px] flex items-center justify-center">
                            <span>No analyzer data yet</span>
                        </Card>
                    </div>
                ) : (
                    analysisData.map((item, index) => {
                        return (
                            <Card
                                className="lg:w-[350px] w-full mr-10 my-4 cursor-pointer hover:shadow-2xl"
                                key={item._id}
                                onClick={() => handleUserAnalysis(item._id)}
                            >
                                <div className="p-4 flex justify-center items-center">
                                    <div className="md:w-[40%] w-full graph">
                                        <div className="p-4 relative z-10">
                                            <Flat
                                                progress={item.analysis.resume_score}
                                                text={"Score"}
                                                sx={{
                                                    strokeColor: "#0075ff",
                                                    barWidth: 4,
                                                    valueSize: 20,
                                                    textSize: 10,
                                                    miniCircleColor: "#3b75ba",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-[60%] w-full analyser_content">
                                        <ul className="text-sm list-disc pl-10">
                                            <li className="my-1 text-red-400 flex justify-between">
                                                <span className="font-medium">Analysis</span>
                                                <span className="ml-2 text-blue-600">
                                                    {item.analysis.resume_score}
                                                </span>
                                            </li>
                                            <li className="my-1 text-red-400 flex justify-between">
                                                <span className="font-medium">Clarity</span>
                                                <span className="text-blue-600 ml-2">
                                                    {item.clarity.score}
                                                </span>
                                            </li>
                                            <li className="my-1 text-red-400 flex justify-between">
                                                <span className="font-medium">Content Quality</span>
                                                <span className="text-blue-600 ml-2">
                                                    {item.content_quality.score}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </section>
    )
}

export default CVanalysis