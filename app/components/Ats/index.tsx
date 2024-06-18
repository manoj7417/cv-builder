import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { GrScorecard } from 'react-icons/gr';
import { AnalyzeAts } from '../../api/api';
import Lottie from 'react-lottie';
import loadingAnimation from '@/public/animations/aibrain.json';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCrown } from 'react-icons/fa';
import { SiOpsgenie } from "react-icons/si";
import { GiMagicLamp } from 'react-icons/gi';
interface AtsProps {
  setActiveTab: (tab: string) => void;
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Ats: React.FC<AtsProps> = ({ setActiveTab }) => {
  const [resumeText, setResumeText] = useState<string>(''); 
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  const submitDataToAnalyze = async () => {
    setLoading(true);
    try {
      const response = await AnalyzeAts(resumeText);
      const result = JSON.parse(response[0].text.value);
      setAtsScore(result.score);
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Error processing the ATS analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to determine color based on score
  const getColor = (score:any) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 50) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <>
      <div className="flex-row justify-between rounded-xl shadow-xl mx-8 bg-white p-5 mb-10">
        <div className='flex items-center space-x-2 mb-5'>
          <p className='flex mx-auto font-semibold text-gray-600'>
            ATS checker <GrScorecard className="ms-3 h-5 w-4 text-indigo-500" />
          </p>
          <IoCloseOutline className='h-6 w-6 cursor-pointer' onClick={() => setActiveTab('Content')} />
        </div>

        {atsScore && !loading ? (
          <div className='chart-container text-center mx-auto w-1/4'>
            <CircularProgressbar
              value={atsScore}
              text={`${atsScore}%`}
              styles={buildStyles({
                pathColor: getColor(atsScore),
                textColor: '#374151',
                trailColor: '#d1d5db',
              })}
              strokeWidth={10}
            />
          </div>
        ) : null}

        {
            feedback.length > 0 ? (
                <div className='text-start mb-5'>
                <h2 className='items-center flex cursor-pointer pt-5 font-bold mb-3 font-sm underline text-indigo-600'><GiMagicLamp  className='text-indigo-400 h-10 w-10 me-3' />Ask Genie to improve your resume </h2>
                <h3 className='mb-3 flex items-center justify-between'>Suggestion to improve your resume:<FaCrown className='text-yellow-400 ms-3 h-6 w-6' /></h3>
                <ol className='text-gray-600 text-sm list-decimal px-8 space-y-2 bg-blue-100 p-3'>
                    {feedback.map((feedbackItem, index) => (
                        <li key={index}>{feedbackItem}</li>
                    ))}
                </ol>
            </div>
            ):<></>
        }

        <div className='text-center'>
          {loading ? (
            <div className="text-center">
              <Lottie options={defaultOptions} height={200} width={250} />
            </div>
          ) : (
            <>
              <div className='flex items-center text-gray-600 text-sm justify-between mb-3'>
                <p>Resume description</p>
                <button className='underline' onClick={() => setResumeText('')}>
                  Clear
                </button>
              </div>
              <textarea 
                id="resume_to_analyze" 
                className='w-full h-52 p-2 rounded-lg border border-gray-500 bg-gray-100 text-gray-700 text-xs' 
                placeholder='Paste your resume here'
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </>
          )}
          <div className='text-center'>
            {loading ? (
                <>
                <button 
                    disabled={true}
                    className='bg-indigo-300 cursor-not-allowed text-white py-2 px-6 rounded mt-3'
                    onClick={submitDataToAnalyze}
                >
                    Analyze
                </button>
                <button 
                    disabled={true}
                    className='bg-indigo-300 cursor-not-allowed text-white py-2 px-6 rounded mt-3 ms-3'
                >
                    Upload resume to analyze
                </button>
                </>
            ) : (
                <>
                <button 
                    onClick={submitDataToAnalyze}
                    className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded mt-3'
                >
                    Analyze
                </button>
                <button 
                    className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded mt-3 ms-3'
                >
                    Upload resume to analyze
                </button>
                </>
            )}
            </div>

         
        </div>
        <div >
            {
                feedback.length > 0 ? (
                   <></>
                ):<>
                 <h2 className='text-gray-700 pt-5 text-center mb-3 font-sm'>How it works</h2>
            <ol className='text-gray-600 text-sm list-decimal px-8 space-y-2 bg-blue-100 p-3'>
                <li>Paste or upload your resume.</li>
                <li>Genie will analyze your resume and provide feedback.</li>
                <li>It will provide a score and suggestions on how to improve your resume.</li>
            </ol>
                </>
            }
           
        </div>
      </div>
    </>
  )
}

export default Ats;
