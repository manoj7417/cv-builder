"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaRocket, FaCrown } from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";

const tests = {
  NumericalReasoning: {
    title: "Work Experience Analysis - Numerical Reasoning",
    questions: [
      {
        question: "What is the sum of the first 10 prime numbers?",
        options: ["129", "140", "160", "170"],
        correct_option: "129",
        description:
          "The first 10 prime numbers are 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29. Their sum is 129.",
      },
      {
        question:
          "If the ratio of boys to girls in a class is 3:2 and there are 18 boys, how many girls are there?",
        options: ["12", "15", "20", "24"],
        correct_option: "12",
        description:
          "If the ratio is 3:2, for every 3 boys, there are 2 girls. If there are 18 boys, there are 12 girls (18 / 3 * 2).",
      },
      {
        question:
          "A car travels 150 miles in 3 hours. What is its average speed in miles per hour?",
        options: ["45", "50", "55", "60"],
        correct_option: "50",
        description:
          "The average speed is calculated by dividing the distance by the time: 150 miles / 3 hours = 50 mph.",
      },
      {
        question:
          "If a product costs $45 and is marked up by 20%, what is the selling price?",
        options: ["$54", "$55", "$60", "$65"],
        correct_option: "$54",
        description:
          "A 20% markup on $45 is $9 (45 * 0.20). Adding this to the original price gives $54.",
      },
      {
        question:
          "A man invests $2000 at an interest rate of 5% per annum. How much will he have after 3 years?",
        options: ["$2150", "$2200", "$2300", "$2400"],
        correct_option: "$2300",
        description:
          "Simple interest calculation: 2000 * 0.05 * 3 = $300. Adding this to the principal gives $2300.",
      },
      {
        question:
          "If the population of a town increases by 10% every year, what will be its population after 2 years if the current population is 5000?",
        options: ["5500", "6050", "6100", "6250"],
        correct_option: "6050",
        description:
          "First year: 5000 * 1.10 = 5500. Second year: 5500 * 1.10 = 6050.",
      },
      {
        question:
          "A rectangle has a length of 10 cm and a width of 6 cm. What is its area?",
        options: ["60 cm²", "66 cm²", "70 cm²", "76 cm²"],
        correct_option: "60 cm²",
        description:
          "The area of a rectangle is length * width: 10 cm * 6 cm = 60 cm².",
      },
      {
        question: "If 5x - 3 = 2, what is the value of x?",
        options: ["1", "2", "3", "4"],
        correct_option: "1",
        description: "Solving the equation: 5x - 3 = 2; 5x = 5; x = 1.",
      },
      {
        question:
          "A store sells a product for $30 after a 25% discount. What was the original price?",
        options: ["$35", "$37.50", "$40", "$45"],
        correct_option: "$40",
        description:
          "Let the original price be x. After a 25% discount, the selling price is 0.75x = $30. Solving for x gives $40.",
      },
      {
        question:
          "If the average of five numbers is 18, what is their total sum?",
        options: ["85", "90", "95", "100"],
        correct_option: "90",
        description:
          "The average of five numbers is the total sum divided by 5. So, 18 * 5 = 90.",
      },
    ],
  },
  VerbalReasoning: {
    title: "Work Experience Analysis - Verbal Reasoning",
    questions: [
      {
        question:
          "Which word does not belong in the following list: Apple, Banana, Cherry, Potato?",
        options: ["Apple", "Banana", "Cherry", "Potato"],
        correct_option: "Potato",
        description:
          "Apple, Banana, and Cherry are fruits, while Potato is a vegetable.",
      },
      {
        question: "Find the synonym for the word 'Elicit':",
        options: ["Suppress", "Induce", "Suppress", "Conceal"],
        correct_option: "Induce",
        description: "Elicit means to draw out or induce.",
      },
      {
        question:
          "Select the word that best completes the following sentence: 'The storm caused widespread ____ to the infrastructure.'",
        options: ["Celebration", "Damage", "Improvement", "Innovation"],
        correct_option: "Damage",
        description:
          "The context of the sentence indicates that 'Damage' is the most appropriate word.",
      },
      {
        question:
          "Which of the following words is the most opposite in meaning to the word 'Obsolete'?",
        options: ["Modern", "Outdated", "Ancient", "Obscure"],
        correct_option: "Modern",
        description:
          "Obsolete means outdated or no longer in use; the opposite is modern.",
      },
      {
        question:
          "Identify the correct meaning of the phrase 'Hit the nail on the head':",
        options: [
          "To miss the point",
          "To get something exactly right",
          "To make a mistake",
          "To hammer a nail perfectly",
        ],
        correct_option: "To get something exactly right",
        description: "The phrase means to do or say something exactly right.",
      },
      {
        question:
          "Choose the word that best completes the analogy: 'Cat is to Feline as Dog is to ____.'",
        options: ["Canine", "Equine", "Reptile", "Rodent"],
        correct_option: "Canine",
        description:
          "The relationship is between the animal and its family. Cat is to Feline as Dog is to Canine.",
      },
      {
        question:
          "Select the word that best fits the blank: 'The CEO gave a very ____ speech to the employees.'",
        options: ["Inspirational", "Destructive", "Unintelligible", "Hesitant"],
        correct_option: "Inspirational",
        description:
          "The context suggests that 'Inspirational' is the most appropriate word.",
      },
      {
        question:
          "Which word does not belong in the following list: Cup, Plate, Knife, Table?",
        options: ["Cup", "Plate", "Knife", "Table"],
        correct_option: "Table",
        description:
          "Cup, Plate, and Knife are utensils, while Table is a piece of furniture.",
      },
      {
        question: "Find the antonym for the word 'Verbose':",
        options: ["Talkative", "Silent", "Wordy", "Articulate"],
        correct_option: "Silent",
        description:
          "Verbose means using more words than necessary; the opposite is silent.",
      },
      {
        question:
          "Select the word that best completes the sentence: 'The detective managed to ____ the suspect's alibi.'",
        options: ["Prove", "Disprove", "Enhance", "Ignore"],
        correct_option: "Disprove",
        description:
          "The context suggests that the detective was able to disprove the suspect's alibi.",
      },
    ],
  },
  SituationalJudgement: {
    title: "Work Experience Analysis - Situational Judgement",
    questions: [
      {
        question:
          "You are working on a team project and one of your team members is not contributing. What should you do?",
        options: [
          "Confront the team member aggressively.",
          "Discuss the issue with the team member privately.",
          "Ignore the situation and hope it improves.",
          "Complain to your supervisor.",
        ],
        correct_option: "Discuss the issue with the team member privately",
        description:
          "Addressing the issue directly with the team member in a private and respectful manner is the most effective approach.",
      },
      {
        question:
          "You notice a coworker has been taking long breaks and affecting the team's productivity. What is your course of action?",
        options: [
          "Report them to HR immediately.",
          "Talk to the coworker to understand the reason for their behavior.",
          "Ignore the behavior and focus on your work.",
          "Start taking longer breaks yourself.",
        ],
        correct_option:
          "Talk to the coworker to understand the reason for their behavior",
        description:
          "Understanding the coworker’s situation can help resolve the issue without escalating it unnecessarily.",
      },
      {
        question:
          "A client is unhappy with a product delivery and is becoming increasingly upset. How do you handle this?",
        options: [
          "Tell the client there is nothing you can do.",
          "Calmly listen to the client and offer a solution.",
          "Ignore the client until they calm down.",
          "Blame the issue on another department.",
        ],
        correct_option: "Calmly listen to the client and offer a solution",
        description:
          "Listening to the client and providing a solution demonstrates empathy and problem-solving skills.",
      },
      {
        question:
          "You are given a tight deadline for a project that requires a lot of work. What should you do?",
        options: [
          "Request an extension from your supervisor.",
          "Prioritize the tasks and manage your time effectively.",
          "Rush through the project and hope for the best.",
          "Delegate all your tasks to coworkers.",
        ],
        correct_option: "Prioritize the tasks and manage your time effectively",
        description:
          "Effective time management and task prioritization are key to meeting tight deadlines.",
      },
      {
        question:
          "You disagree with your manager's approach to a task. How do you address this?",
        options: [
          "Publicly criticize your manager's approach.",
          "Discuss your concerns with your manager privately.",
          "Do the task your way without informing your manager.",
          "Refuse to do the task.",
        ],
        correct_option: "Discuss your concerns with your manager privately",
        description:
          "Privately discussing your concerns with your manager shows respect and a willingness to find a mutually agreeable solution.",
      },
      {
        question:
          "A colleague is taking credit for your work. What is your response?",
        options: [
          "Confront the colleague in a team meeting.",
          "Discuss the issue with the colleague privately.",
          "Ignore it and continue working hard.",
          "Report the behavior to your supervisor.",
        ],
        correct_option: "Discuss the issue with the colleague privately",
        description:
          "Addressing the issue directly with the colleague can resolve the misunderstanding without escalating the situation.",
      },
      {
        question:
          "You are feeling overwhelmed with your workload. What do you do?",
        options: [
          "Take a day off without informing anyone.",
          "Talk to your supervisor about your workload.",
          "Ignore the stress and keep working.",
          "Complain to your coworkers about your situation.",
        ],
        correct_option: "Talk to your supervisor about your workload",
        description:
          "Discussing your workload with your supervisor can help find a solution to manage your tasks more effectively.",
      },
      {
        question:
          "A team member is consistently late to meetings, causing delays. How do you handle this?",
        options: [
          "Report them to HR.",
          "Talk to the team member privately about their tardiness.",
          "Ignore the behavior and continue with the meetings.",
          "Publicly reprimand the team member during a meeting.",
        ],
        correct_option:
          "Talk to the team member privately about their tardiness",
        description:
          "Privately discussing the issue with the team member shows professionalism and a willingness to resolve the problem.",
      },
      {
        question:
          "Your supervisor asks you to take on additional responsibilities that you are not familiar with. What do you do?",
        options: [
          "Refuse the additional responsibilities.",
          "Accept the responsibilities and ask for guidance.",
          "Ignore the request and continue with your current tasks.",
          "Delegate the new tasks to someone else.",
        ],
        correct_option: "Accept the responsibilities and ask for guidance",
        description:
          "Accepting new responsibilities and seeking guidance demonstrates a willingness to learn and adapt.",
      },
      {
        question:
          "You notice a mistake in a project that is due soon. How do you proceed?",
        options: [
          "Ignore the mistake and submit the project.",
          "Fix the mistake yourself immediately.",
          "Inform your supervisor about the mistake.",
          "Blame the mistake on a coworker.",
        ],
        correct_option: "Fix the mistake yourself immediately",
        description:
          "Correcting the mistake promptly ensures the quality of the project and demonstrates responsibility.",
      },
    ],
  },
  DiagrammaticReasoning: {
    title: "Work Experience Analysis - Diagrammatic Reasoning",
    questions: [
      {
        question: "Which is the next logical image in the sequence?",
        image_url: "/d1.webp",
        options: ["A", "B", "C", "D", "E", "F"],
        correct_option: "E",
        description:
          "There is a central circle surrounded by eight circles. The central circle changes colour from grey to having a dotted outline to black. At each step in the series one circle is removed in the order of white, black, grey circles. The order of the remaining circles is randomised.",
      },
      {
        question: "Which is the next logical image in the sequence?",
        image_url: "/d2.webp",
        options: ["A", "B", "C", "D", "E", "F"],
        correct_option: "F",
        description:
          "There are four arrows. At each step in the series: the first arrow rotates 45-degrees clockwise; the second arrow rotates 45-degrees clockwise; the third arrow and the fourth arrow are reflections of the first two arrows in the horizontal plane.",
      },
      {
        question: "Which is the next logical image in the sequence?",
        image_url: "/d3.webp",
        options: ["A", "B", "C", "D", "E", "F"],
        correct_option: "B",
        description:
          "There are two figures: a triangle and a circle. At each step in the series both the circle and the triangle move a step down a vertical line. As each shape reaches the bottom of a block it returns’ to the top of the next block.",
      },
      {
        question: "Which is the next logical image in the sequence?",
        image_url: "/d4.webp",
        options: ["A", "B", "C", "D", "E", "F"],
        correct_option: "D",
        description:
          "There are three rows of three squares; one row in each square is black. At each step, every row moves down one place. The row which leaves the bottom of the block reappears at the top.",
      },
      {
        question: "Which is the next logical image in the sequence?",
        image_url: "/d5.webp",
        options: ["A", "B", "C", "D", "E", "F"],
        correct_option: "E",
        description:
          "Each block in the series contains an arrow in each corner. At each step in the series two adjacent arrows reverse their direction. This process starts with the top left-hand corner and bottom left-hand corner arrows. Then the next two adjacent arrows - moving one figure anticlockwise – are the bottom left-hand corner and right-hand corner arrows.",
      },
    ],
  },
  AbstractReasoning: {
    title: "Work Experience Analysis - Abstract Reasoning",
    questions: [
      {
        question:
          "Choose the image that completes the pattern (From left to right):",
        image_url: "/q1.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "D",
        description:
          "Each circle is divided into six portions; three pairs of identical shapes are located in opposite cells; the grey pieces rotate clockwise. All the inner parts rotate in a counter-clockwise direction. It is not easy to recognise the presence of the three pairs. However, one can reach the same conclusions using other clues. For instance, one may note that the same couple of shapes appear in the first and fourth items of the sequence, as is the second and fifth items. It is only logical that the next item of the series will include two hearts located in the right and left cells. This reasoning should lead us to narrow the possible answer to options (A) and (D). Figuring out the grey portions' movement pattern leaves us with possible options (B) and (D). Combining these two conclusions, and we're left with choice (D) as the only option to comply with this problem's reasoning.",
      },
      {
        question:
          "Choose the image that completes the pattern (From left to right):",
        image_url: "/q2.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "A",
        description:
          "The logic: The inner shape in one frame becomes the middle shape in the next frame; the central form becomes the outer shape in the next frame, and the external form becomes the inner shape two frames later.Thus, the outer shape in the missing frame should be a square (just like the middle shape in the 5th frame), the central form should be a triangle (like the inner shape in the 5th frame), and the internal structure should be a diamond (like the outer shape in the 4th frame).",
      },
      {
        question: "Which shape comes next in the sequence?",
        image_url: "/q3.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "E",
        description:
          "The black and white dots are alternating between 5 and 7 in number. In the last picture there are 5 white dots and 7 black ones, meaning the following image should contain 7 white dots and 5 black ones.",
      },
      {
        question: "Complete the sequence.",
        image_url: "/q4.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "B",
        description:
          "Each tile contains 2 overlapping shapes, 1 larger than the other. As the 2 shapes overlap a new, smaller shape if created inside the first large shape. The large shape in the following tile corresponds directly with this new shape that was created. When the shapes overlap the largest bisection is always within the biggest shape.",
      },
      {
        question: "Complete the sequence.",
        image_url: "/q5.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "C",
        description:
          "The first two rules are relatively easy to work out. The shape in the centre alternates between orange and white and the navy dot is moving around the tile corners in a clockwise direction. The real challenge is spotting that the big black square is moving around the sides and corners of the tile in alternating directions, first anti-clockwise, then clock-wise. It also increases how many spaces it moves in increments of one. First it moves anti-clockwise one position, next it moves 2 spaces clockwise, then 3 anti-clockwise and so on.",
      },
      {
        question: "Which of the boxes comes next in the sequence?",
        image_url: "/q6.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "B",
        description:
          "Circle, maintains same position in top right segment for one turn, and then is not present for the following three turns. Triangle, maintains same position in bottom left segment for one turn, and then is not present for the following two turns. So the correct answer is B).",
      },
      {
        question: "Which shape follows in the sequence?",
        image_url: "/q7.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "A",
        description:
          "Diagonal line changes direction from top left corner to bottom right corner, then from top right corner to bottom left corner with each turn. Square moves around corner of the frame in an anti-clockwise direction with each turn. Circle appears on diagonal line in every third frame with each turn. So the correct answer is A).",
      },
      {
        question: "Which box follows the sequence?",
        image_url: "/q8.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "D",
        description:
          "’U’ shape rotates by 90 degrees with each turn. Circle changes position in the ’U’ shape as it appears in each segment with each turn. Triangle appears in same position within the ‘U’ shape on each alternate turn. So the correct answer is D).",
      },
      {
        question:
          "Select a suitable option that would complete the figure matrix.",
        image_url: "/q9.svg",
        options: ["A", "B", "C", "D"],
        correct_option: "D",
        description:
          "With each step along the row, an additional radial line is added to the polar grid. Note: A radial line is a line that extends from the center of the grid to the outer edge.With each step along the column, an additional circle is added to the polar grid.",
      },
    ],
  },
  SpatialReasoning: {
    title: "Work Experience Analysis - Spatial Reasoning",
    questions: [
      {
        question: "What would the 3D shape look like from above?",
        image_url: "/S1.webp",
        options: ["A", "B", "C", "D"],
        correct_option: "A",
        description:
          "When looking from above, height doesn’t matter so the simplest thing to do is work out the outline of the shape. Once you have this you can see that it must be A which is a triangle with a kind of jagged edge.",
      },
      {
        question: "Which of the given shapes is the correct mirror image?",
        image_url: "/s2.webp",
        options: ["A", "B", "C", "D"],
        correct_option: "A",
        description:
          "The easiest approach is to start as close to the mirror line as possible and work further away. You can see in this case that there are two circles slightly on top of each other so the answer must be A or D. If you assess the positioning of the outer circles, you can see the answer must be A.",
      },
      {
        question:
          " Which of the given shapes is the same 3D shape but in a different position?",
        image_url: "/s3.webp",
        options: ["A", "B", "C", "D", "E"],
        correct_option: "D",
        description:
          "You can see that the two large blocks are adjacent which rules out B. The thinner block sits inside the larger block which rules out A and C so the answer must be B.",
      },
      {
        question:
          "Choose the shape that could be the result if these two shapes were combined and no other changes were made.",
        image_url: "/s4.webp",
        options: ["A", "B", "C", "D"],
        correct_option: "B",
        description:
          "The simplest way to figure this out, is to try fitting the shapes together in your mind until you hit a solution. Doing this, you can see B is a combination of the two shapes back to back.",
      },
      {
        question:
          "If the net was folded into a cube, which of the given shapes would it look like?",
        image_url: "/s5.webp",
        options: ["A", "B", "C", "D"],
        correct_option: "D",
        description:
          "To get the answer you need to fold the cube together in your mind. Doing this, you can see that the 3 circles and the square will be adjacent and there will be a blank square adjacent to both of them.",
      },
      {
        question: "Count the number of squares in the given figure.",
        image_url: "/s6.png",
        options: ["13", "16", "19", "20", "E"],
        correct_option: "16",
        description:
          "The simplest squares are BCNM, CDON, PQIJ and QRHI i.e. 4 in number.The squares composed of two components each are MNTS, NOUT, STQP and TURQ i.e. 4 in number.The squares composed of five components each are ACTL, CEFT, TFGI and LTIK i.e. 4 in number.The squares composed of six components each are BDUS and SUHJ i.e. 2 in number.There is only one square i.e. MORP composed of eight components.There is only one square i.e. AEGK composed of twenty components.Total number of squares in the figure = 4 + 4 + 4 + 2+1 + 1 = 16.",
      },
      {
        question: "How many circles are there in the adjoining figure.",
        image_url: "/s7.png",
        options: ["11", "12", "13", "14"],
        correct_option: "13",
        description:
          "The figure may be labelled as shown.There are 13 circles in the given figure. This is clear from the adjoining figure in which the centres of all the circles in the given figure have been numbered from 1 to 13.",
      },
      {
        question: "Count the number of squares in the given figure.",
        image_url: "/s8.png",
        options: ["6", "7", "9", "10"],
        correct_option: "9",
        description:
          "The figure may be labelled as shown.The squares composed of two components each are ABKJ, BCLK, CDEL, LEFG, KLGH and JKHI i.e.6 in number.There is only one square i.e. CEGK composed of four components.The squares composed of eight components each are ACGI and BDFH i.e. 2 in number.There are 6 + 1 + 2 = 9 squares in the figure.",
      },
      {
        question: "Count the number of rectangles in the given figure.",
        image_url: "/s9.png",
        options: ["8", "17", "18", "20"],
        correct_option: "18",
        description:
          "The figure may be labelled as shown.The simplest rectangles are ABQP, PQNO, BCDN, NDEM, MEFL, LFJK, FGHR and RHIJ i.e. 8 in number.The rectangles composed of two components each are ABNO, BCEM, NDFL, MEJK and FGIJ i.e. 5 in number.The rectangles composed of three components each are ACDO, BCFL, NDJK and LGIK i.e. 4 in number.There is only one rectangle i.e. BCJK composed of four components.Total number of rectangles in the figure = 8 + 5 + 4 + 1 = 18.",
      },
      {
        question:
          "Count the number of triangles and squares in the given figure.",
        image_url: "/s10.png",
        options: [
          "44 triangles, 10 squares",
          "14 triangles, 16 squares",
          "27 triangles, 6 squares",
          "36 triangles, 9 squares",
        ],
        correct_option: "44 triangles, 10 squares",
        description:
          "Triangles :The simplest triangles are AEI, EOI, OHI, HAI, EBJ, BFJ, FOJ, OEJ, HOL, OGL, GDL, DHL, OFK, FCK, CGK and GOK i.e. 16 in number.The triangles composed of two components each are HAE, AEO, EOH, OHA, OEB, EBF, BFO, FOE, DHO, HOG, OGD, GDH, GOF, OFC, FCG and CGO i.e. 16 in number.The triangles composed of four components each are HEF, EFG, FGH, GHE, ABO, BGO, CDO and DAO i.e. 8 in number.The triangles composed of eight components each are DAB, ABC, BCD and CDA i.e. 4 in number.Total number of triangles in the figure = 16 + 16 + 8 + 4 = 44.Squares :The squares composed of two components are HIOL, IEJO, JFKO and KGLO i.e. 4 in number.The squares composed of four components are AEOH, EBFO, OFGC and HOGD i.e.4 in number.There is only one square EFGH which is composed of eight components.There is only one square ABCD which is composed of sixteen components.Total number of squares in the figure = 4 + 4 + 1 + 1 = 10.",
      },
    ],
  },
  LogicalReasoning: {
    title: "Work Experience Analysis - Logical Reasoning",
    questions: [
      {
        question:
          "All roses are flowers. Some flowers fade quickly. Therefore, some roses fade quickly. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "No",
        description:
          "The conclusion is not necessarily correct because it assumes all roses are included in the subset of flowers that fade quickly.",
      },
      {
        question:
          "If all cats are animals and some animals are pets, can we conclude that some cats are pets?",
        options: ["Yes", "No"],
        correct_option: "No",
        description:
          "The conclusion is not necessarily correct because it does not account for whether the subset of cats overlaps with the subset of pets.",
      },
      {
        question:
          "Tom is older than Jim, and Jim is older than Sue. Therefore, Tom is older than Sue. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct based on the given statements.",
      },
      {
        question:
          "All pencils are writing tools. All writing tools are instruments. Therefore, all pencils are instruments. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion follows logically from the premises that all pencils are writing tools and all writing tools are instruments.",
      },
      {
        question:
          "If all birds can fly and some birds are sparrows, can we conclude that some sparrows can fly?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct because sparrows are included in the subset of birds that can fly.",
      },
      {
        question:
          "No fish are mammals. All salmon are fish. Therefore, no salmon are mammals. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct based on the given statements.",
      },
      {
        question:
          "If no athletes are lazy and some students are athletes, can we conclude that some students are not lazy?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct because the subset of students who are athletes are included in the subset of non-lazy individuals.",
      },
      {
        question:
          "All squares are rectangles. No rectangles are circles. Therefore, no squares are circles. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion follows logically from the premises that no rectangles are circles and all squares are rectangles.",
      },
      {
        question:
          "Some doctors are not surgeons. All surgeons are doctors. Therefore, some doctors are not surgeons. Is this conclusion correct?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct based on the given statements.",
      },
      {
        question:
          "If all roses are red and some flowers are roses, can we conclude that some flowers are red?",
        options: ["Yes", "No"],
        correct_option: "Yes",
        description:
          "The conclusion is logically correct because the subset of flowers that are roses are included in the subset of red flowers.",
      },
    ],
  },
  MechanicalReasoning: {
    title: "Work Experience Analysis - Mechanical Reasoning",
    questions: [
      {
        question:
          "Which gear will turn faster if Gear A has 10 teeth and Gear B has 20 teeth?",
        options: [
          "Gear A",
          "Gear B",
          "Both turn at the same speed",
          "Cannot be determined",
        ],
        correct_option: "Gear A",
        description: "Gear A will turn faster because it has fewer teeth.",
      },
      {
        question:
          "If you apply force to a lever arm at a greater distance from the fulcrum, the effort required to lift an object:",
        options: [
          "Increases",
          "Decreases",
          "Stays the same",
          "Cannot be determined",
        ],
        correct_option: "Decreases",
        description:
          "Applying force farther from the fulcrum decreases the effort required.",
      },
      {
        question:
          "In a pulley system, increasing the number of pulleys used will:",
        options: [
          "Increase the effort required",
          "Decrease the effort required",
          "Have no effect on the effort",
          "None of the above",
        ],
        correct_option: "Decrease the effort required",
        description:
          "Using more pulleys in a system reduces the effort needed to lift a load.",
      },
      {
        question:
          "A block and tackle system with 4 ropes will reduce the effort needed to lift a load by:",
        options: ["2 times", "3 times", "4 times", "5 times"],
        correct_option: "4 times",
        description:
          "The effort is reduced by a factor equal to the number of ropes.",
      },
      {
        question:
          "If two objects have the same volume but different masses, the denser object will:",
        options: ["Float", "Sink", "Stay suspended", "Cannot be determined"],
        correct_option: "Sink",
        description:
          "The denser object will sink because it has a higher mass per unit volume.",
      },
      {
        question:
          "What is the mechanical advantage of an inclined plane with a length of 10 meters and a height of 2 meters?",
        options: ["2", "5", "10", "20"],
        correct_option: "5",
        description:
          "The mechanical advantage of an inclined plane is the ratio of the length to the height (10/2).",
      },
      {
        question:
          "In a hydraulic system, if the small piston has an area of 2 cm² and the large piston has an area of 10 cm², applying a force of 5 N to the small piston will result in a force of:",
        options: ["10 N", "20 N", "25 N", "50 N"],
        correct_option: "25 N",
        description:
          "The force is multiplied by the ratio of the areas of the pistons (10/2) * 5 N = 25 N.",
      },
      {
        question: "Which type of simple machine is a screw?",
        options: ["Lever", "Wheel and axle", "Inclined plane", "Pulley"],
        correct_option: "Inclined plane",
        description:
          "A screw is a type of inclined plane wrapped around a cylinder.",
      },
      {
        question:
          "If a wheelbarrow is a second-class lever, where is the fulcrum located?",
        options: [
          "At the wheel",
          "At the handles",
          "At the middle of the load",
          "None of the above",
        ],
        correct_option: "At the wheel",
        description:
          "In a second-class lever, the fulcrum is at one end (the wheel).",
      },
      {
        question:
          "In a series circuit with three resistors, the total resistance is:",
        options: [
          "The sum of all resistances",
          "The average of all resistances",
          "The highest resistance",
          "None of the above",
        ],
        correct_option: "The sum of all resistances",
        description:
          "In a series circuit, the total resistance is the sum of all individual resistances.",
      },
    ],
  },
};

const Preloader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="loader">
      <div className="spinner"></div>
      <p className="text-gray-700 mt-4">Loading, please wait...</p>
    </div>
    <style jsx>{`
      .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-top-color: #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [currentTest, setCurrentTest] = useState("NumericalReasoning");
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const [numbers, setNumbers] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testName = params.get("name") || "NumericalReasoning";
    setCurrentTest(testName);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      return () => clearTimeout(popupTimer);
    }
  }, [isSubmitted]);

  const handleOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < tests[currentTest].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const newResults = tests[currentTest].questions.map((question, index) => ({
      question: question.question,
      correct: question.options[answers[index]] === question.correct_option,
      description: question.description,
      selected_option: question.options[answers[index]],
      correct_option: question.correct_option,
    }));
    setResults(newResults);

    const correctAnswers = newResults.filter((result) => result.correct).length;
    const numbers = `${correctAnswers}/${newResults.length}`;
    setNumbers(numbers);
    const percentage = (correctAnswers / newResults.length) * 100;
    setScore(percentage);

    setIsSubmitted(true);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 relative">
      <div className="animated-bg"></div>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full z-10">
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{tests[currentTest].title}</h1>
              <span className="text-gray-500">
                Question {currentQuestion + 1} of{" "}
                {tests[currentTest].questions.length}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-lg">
                {tests[currentTest].questions[currentQuestion].question}
              </p>
              {tests[currentTest].questions[currentQuestion].image_url && (
                <img
                  src={tests[currentTest].questions[currentQuestion].image_url}
                  alt="Question"
                  className="mt-4"
                />
              )}
            </div>
            <div className="space-y-4">
              {tests[currentTest].questions[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`w-full text-left p-4 border rounded-md ${
                      answers[currentQuestion] === index
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`py-2 px-4 rounded-md ${
                  currentQuestion === 0
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>
              {currentQuestion < tests[currentTest].questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Next question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <div className="flex items-center mb-6 w-full">
              <div className="h-[10%] w-[15%]">
                <CircularProgressbar
                  value={score}
                  text={`${Math.round(score)}%`}
                  styles={buildStyles({
                    textColor: "#000",
                    pathColor: "#00aaff",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
            <p className="text-xl font-semibold mb-6">Score: {numbers}</p>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`p-4 border rounded-md ${
                    result.correct
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                  }`}
                >
                  <p className="font-semibold">{result.question}</p>
                  <p>
                    <strong>Your answer:</strong> {result.selected_option}
                  </p>
                  <p>
                    <strong>Correct answer:</strong> {result.correct_option}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {result.description}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Retake Test
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          style={{ background: "url(/repopup.jpg)" }}
        >
          <div className="bg-white flex flex-col md:flex-row rounded-lg shadow-lg justify-center items-center overflow-hidden w-full md:w-[60%] relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6 text-gray-700 hover:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="px-6 py-4 w-[90%] md:w-[50%]">
              <h2 className="text-2xl font-semibold mb-4 uppercase text-blue-950">
                Looking for career counseling? Take an AI-personalized test
                today!
              </h2>
              <p className="text-gray-700 mb-4">
                Are you seeking career guidance? Take our AI-personalized test
                to discover your ideal career path. Our advanced AI technology
                analyzes your strengths, interests, and preferences to provide
                tailored advice and recommendations. Start your journey towards
                a fulfilling career today with our customized counseling
                solutions.
              </p>
              <a href="/career-coaching">
                {" "}
                <button className="flex items-center bg-gradient-to-r from-[#3c5087] to-[#3873b7] text-white py-4 px-8 rounded shadow-lg hover:bg-gradient-to-l  transition duration-300 transform hover:scale-105">
                  <FaCrown className="mr-2 animate-pulse" />
                  TRY NOW !
                </button>
              </a>
            </div>
            <div className="px-6 py-4  w-[90%] md:w-[50%]">
              <img
                src="/aipersonalized.gif"
                alt="aipersonalized"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/hexa.jpg") repeat;
          animation: move 40s linear infinite;
          z-index: 0;
        }
        @keyframes move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }
        .popup {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #ccc;
          position: relative;
          width: 300px;
          max-width: 90%;
          border-radius: 10px;
          overflow: hidden;
        }
        .popup:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #ccc;
          z-index: -1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Page;
