'use client'
import React, { useState, useEffect } from 'react';

// Sample sections data
const sectionsData = [
    { title: "Skills", content: "Detail your skills here..." },
    { title: "Experience", content: "Detail your experience here..." },
    // Add more sections as needed
];

const pageHeight = 1122; // Approximate A4 height in pixels at 96dpi

const ResumePagination = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        paginateContent();
    }, []);

    const paginateContent = () => {
        const newPages = [];
        let currentPageContent = [];

        sectionsData.forEach((section, index) => {
            const sectionElement = (
                <div className="section" key={index}>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                </div>
            );

            // Append section to the current page
            currentPageContent.push(sectionElement);

            // Create a new page if the current page exceeds the height
            const pageElement = (
                <div className="page" style={{ display: 'none' }} key={`page-${newPages.length}`}>
                    {currentPageContent}
                </div>
            );
            newPages.push(pageElement);

            if (pageElement.clientHeight > pageHeight) {
                // Remove the last section from the overflowing page
                currentPageContent = [sectionElement];
                newPages.push(
                    <div className="page" style={{ display: 'none' }} key={`page-${newPages.length}`}>
                        {currentPageContent}
                    </div>
                );
            }
        });

        setPages(newPages);
        showPage(0);
    };

    const showPage = (index) => {
        const totalPages = pages.length;
        if (index < 0 || index >= totalPages) return;

        setCurrentPage(index);
    };

    return (
        <div>
            <div id="resumeContent">
                {pages}
            </div>
            <div id="navigation">
                <button
                    onClick={() => showPage(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span id="pageNumber">{currentPage + 1}</span>
                <button
                    onClick={() => showPage(currentPage + 1)}
                    disabled={currentPage === pages.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ResumePagination;
