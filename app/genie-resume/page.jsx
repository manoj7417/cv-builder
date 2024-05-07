'use client';
import React, { useEffect } from 'react';
import { Resume } from '../components/Resume';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';

const Page = () => {
  useEffect(() => {
    const resume = localStorage.getItem('newResumeContent');

    if (resume) {
      // Call API to get the JSON
      // Set that to resume-builder-parser-state inside its resume object
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Resume />
      </Provider>
    </>
  );
}

export default Page;