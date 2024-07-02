"use client";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaRocket, FaCrown } from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  return (
    <>
      <>
        <section className="bg-gradient-to-r from-white to-[#dcecff] text-gray-800 py-20">
          <div className="container lg:max-w-6xl w-full mx-auto rounded-lg lg:p-0 p-5">
            <header
              style={{
                textAlign: "start",
                color: "rgb(0, 0, 0)",
                fontSize: 18,
              }}
            >
              <h1 className="text-3xl ">
                Cookies and Tracking Technology Policy
              </h1>
            </header>
            <div
              style={{
                textAlign: "start",
                color: "rgb(0, 0, 0)",
                fontSize: "1.4rem",
              }}
            >
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  Last updated:&nbsp;
                </span>
                <span
                  style={{
                    color: "rgb(0, 0, 0)",

                    fontSize: "10pt",
                  }}
                >
                  29 May, 2023
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  Thank you for visiting a&nbsp;
                </span>
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    Genies Career Hub
                  </span>
                </strong>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  &nbsp;(“Provider”, “we” or “us”) offering. To help inform you,
                  we provide this notice (“Cookie and Tracking Technology
                  Policy”) on our family of websites, as well as our other
                  related mobile websites, mobile Provider applications (“mobile
                  apps”), services, tools and other applications that link to
                  this notice (collectively, the “Site”). This Cookie and
                  Tracking Technology Policy governs your consent to our, as
                  well as third-party partners and vendors use, of a variety
                  of cookies and tracking technologies. You can find out more
                  about these types of technology and how to control them in the
                  information below. This Cookie and Tracking Technology Policy
                  forms part of the Providers Privacy Policy, available
                  at&nbsp;
                </span>
                <strong>
                  <a href="/privacy-policy" style={{ color: "transparent" }}>
                    <u>
                      <span
                        style={{ color: "rgb(231, 86, 44)", fontSize: "10pt" }}
                      >
                        Privacy Policy
                      </span>
                    </u>
                  </a>
                </strong>
                .
              </p>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "11pt" }}>
                    1.
                  </span>
                </strong>{" "}
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    WHAT ARE COOKIES AND OTHER TRACKING TECHNOLOGY, AND HOW DO
                    WE USE THEM?
                  </span>
                </strong>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  A cookie is a small text file that is stored on your device by
                  a website that you have visited. Cookies may be placed by the
                  Site (first-party cookies) or by third parties (third-party
                  cookies) to monitor the use of a website. Cookies will be
                  identified depending on their purpose and functionality. Some
                  types of cookie include, but are not limited to:
                </span>
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    &nbsp;
                  </span>
                </strong>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    Necessary:
                  </span>
                </strong>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  &nbsp;These cookies are essential for the Site’s performance
                  and enable you to use its features. Necessary cookies will
                  always be dropped because these are required in order for the
                  Site to function properly. For example, essential cookies
                  include, but are not limited to, cookies dropped to provide
                  the service, maintain your account, provide builder access,
                  payment pages, create IDs for your documents and to store your
                  consent. These cookies record the performance of the Site
                  according to your interaction with it.
                </span>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "12pt" }}>
                  &nbsp;
                </span>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  We may use cookies/tracking technology required for systems
                  administration, to prevent fraudulent activity, improve
                  security or allow you to make use of shopping-basket
                  functionality.&nbsp;
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    Analytics:
                  </span>
                </strong>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  &nbsp;These cookies analyse visitors’ use of our Site,
                  offering you a better experience. Analytics-related cookies
                  used on our Site do not identify you or allow us to send you
                  targeted advertising. For example, we may use cookies/tracking
                  technology for analytics-related purposes to: (a) determine
                  the number of visitors to our Site, identify how visitors move
                  around the Site and, in particular, which pages they visit.
                  This allows us to improve our Site and our services; and (b)
                  determine, if data is available, from which part of the world
                  our Site is being visited so that we can ensure sufficient
                  coverage. More specifically, and as an example, the Provider
                  uses Google Analytics session cookies to provide meaningful
                  reports about Site visitors. Google Analytics cookies do not
                  collect personal data about Site visitors. We have also
                  engaged other third-party providers to analyse the activities
                  of visitors to this Site, and its authorised use of cookies
                  and other tracking technology enable it to have access to
                  information about visitors to this Site, including your
                  personal information, to determine your user traits and
                  preferences to better understand user conversion rates.&nbsp;
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    Performance and personalisation:
                  </span>
                </strong>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  &nbsp;These cookies make it possible for us to give you access
                  to a customised experience. Personalisation cookies are used
                  to deliver content, including ads, relevant to your interests
                  on our Site and third-party sites based on how you interact
                  with the different elements on our Site, as well as to track
                  the content that you access (including viewing videos). We may
                  also collect computer and/or connection information to tailor
                  your experience to fit your requirements. During some visits,
                  we may use software tools to measure and collect session
                  information, including page response times, download errors,
                  session information and page interaction information.
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    Advertising:
                  </span>
                </strong>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  &nbsp;These cookies are placed by third-party companies to
                  deliver targeted content based on relevant topics that
                  interest you (for example, providing you with Facebook ads
                  that would interest you) and allow you to better interact with
                  social media platforms such as Facebook. We may use
                  advertising tracking technology to deliver content, including
                  ads, relevant to your interests on our Site and third-party
                  sites based on how you interact with our advertisements or
                  content, as well as to track the content that you access
                  (including viewing videos).&nbsp;
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  Our goal is to collect and use only information that we think
                  is required for our legitimate business interests in order to
                  better understand your interests and improve your experience
                  of using the Site.
                </span>{" "}
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  Cookies set via our Site include those listed below in Section
                  2.
                </span>
              </p>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    2. CONTROLLING AND DELETING COOKIES, AND TRACKING TECHNOLOGY
                  </span>
                </strong>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  When you access this Site for the first time, or if you have
                  not set your cookie preferences yet, depending on your
                  location, you may be prompted to accept or decline the use of
                  cookies, other than those that are essential. The Help
                  function within your browser will also be available to guide
                  you when setting your cookie preferences. If cookie preference
                  settings are available in your country, you can change them at
                  any time by accessing your account and clicking My Settings –
                  Privacy Settings. If you have not created an account with us
                  you can manage your cookie preferences by clicking{" "}
                  <strong>
                    <a
                      href="https://www.livecareer.co.uk/profile/email-preference.aspx?p=userid"
                      style={{ color: "transparent" }}
                    >
                      here
                    </a>
                  </strong>{" "}
                  or through the Settings page of your browser. Please also note
                  that in some cases, restricting, removing or refusing to
                  accept cookies may reduce or prevent the functionality of the
                  Site.
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  The following is a list of cookies dropped on the Site. When
                  you accept cookies, you also allow the collection and sharing
                  of your personal data with third-party vendors. Even though we
                  are not responsible for third-party policies or practises, we
                  do our utmost to ensure that these third-party vendors have
                  privacy policies in place that comply with applicable privacy
                  laws. We try to keep this information current, and will add to
                  and subtract from the chart below from time to time, but it is
                  provided as a courtesy and may not be accurate or up to date.
                  Please contact the applicable third parties regarding their
                  privacy and data security policies and practises. You can also
                  find out more information about their policies by accessing
                  their web pages.
                </span>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  color: "rgb(255, 255, 255)",
                }}
              >
                &nbsp;
              </p>
              <div align="left">
                <table style={{ border: "none", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p style={{ textAlign: "center" }}>
                          <strong>
                            <span
                              style={{
                                color: "rgb(0, 0, 0)",
                                fontSize: "10pt",
                              }}
                            >
                              Cookie name
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p style={{ textAlign: "center" }}>
                          <strong>
                            <span
                              style={{
                                color: "rgb(0, 0, 0)",
                                fontSize: "10pt",
                              }}
                            >
                              Description
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p style={{ textAlign: "center" }}>
                          <strong>
                            <span
                              style={{
                                color: "rgb(0, 0, 0)",
                                fontSize: "10pt",
                              }}
                            >
                              Duration
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p style={{ textAlign: "center" }}>
                          <strong>
                            <span
                              style={{
                                color: "rgb(0, 0, 0)",
                                fontSize: "10pt",
                              }}
                            >
                              Provider
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p style={{ textAlign: "center" }}>
                          <strong>
                            <span
                              style={{
                                color: "rgb(0, 0, 0)",
                                fontSize: "10pt",
                              }}
                            >
                              Category
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __atuvc
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is associated with the AddThis social
                            sharing widget, which is commonly embedded in
                            websites to enable visitors to share content with a
                            range of networking and sharing platforms. It stores
                            an updated page share count.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (13 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            AddThis
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _fbp
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and used by Facebook to store
                            and track visits across websites, identify the
                            performance of our marketing campaigns on Meta and
                            to deliver to you third party targeted advertising.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (3 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Facebook
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _uetsid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This is a cookie utilised by Microsoft Bing Ads and
                            is a tracking cookie. It allows us to engage with a
                            user that has previously visited our website.&nbsp;
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (30 mins)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Bing
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _uetvid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used to track visitors on multiple websites, in
                            order to present relevant advertisements based on
                            the visitors preferences.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (16 days)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Bing
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            fr
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is set by Facebook to determine if the
                            user is currently logged into their Facebook
                            account.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (3 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Facebook
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            IDE
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used by Google DoubleClick to register and report
                            the website user’s actions after viewing or clicking
                            one of the advertiser’s ads with the purpose of
                            measuring the efficacy of an ad and to present
                            targeted ads to the user.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1.5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Double Click
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            MR
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics cookie thats used to pass user action
                            information to the Bing advertising network.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (7 days)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Bing
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            MUID
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is an analytics service provided that
                            connects data from the Bing advertising network with
                            actions performed on the website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (4 weeks)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Bing
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            RUL
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is associated with the DoubleClick for
                            Publishers service from Google. One of its purposes
                            is to measure interactions with the ads on our
                            domain and to prevent the same ads from being shown
                            to you too many times.&nbsp;
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Double Click
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            u2
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used by bs.serving-sys.com
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (3 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            sizmek
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Advertising
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __insp_norec_sess
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet uses these cookies to keep a session
                            information track. These cookies are needed to
                            accurately understand how visitors navigate the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __insp_nv
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet uses these cookies to keep a session
                            information track. These cookies are needed to
                            accurately understand how visitors navigate the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __insp_slim
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet uses these cookies to keep a session
                            information track. These cookies are needed to
                            accurately understand how visitors navigate the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __insp_targlpt
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet uses these cookies to keep a session
                            information track. These cookies are needed to
                            accurately understand how visitors navigate the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            __insp_wid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet uses these cookies to keep a session
                            information track. These cookies are needed to
                            accurately understand how visitors navigate the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Inspectlet
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _ga
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is set by Google Analytics (a web
                            analytics service provided by Google, Inc. -
                            “Google”), and is used to distinguish users on the
                            website to generate statistical information about
                            their use of the website. This helps us improve the
                            website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (2 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _gali
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and used by Google Analytics
                            to determine which links on a page that are being
                            clicked.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (30 seconds)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _gat
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used to throttle request rate. If Google Analytics
                            is deployed via Google Tag Manager, this cookie will
                            be named _dc_gtm_&lt;property- id&gt;.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 minute)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _gat_UA
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and used by Google Analytics
                            to throttle the request rate.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 min)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _gcl_au
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used by Google AdSense for experimenting with
                            advertisement efficiency across websites using their
                            services. Its the first-party cookie for
                            Conversion Linker functionality it takes
                            information in ad clicks and stores it in a
                            first-party cookie so that conversions can be
                            attributed outside the landing page.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (90 days)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Tag Manager
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _gid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and used by Google Analytics
                            for the visitor reports. Used to distinguish users.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 day)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>_ga_*</span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                Used to persist session state by Google
                                Analytics.
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                Persistent (2 years)
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics 4
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                Web analytics/statistics
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>_gac_gb_*</span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                Contains campaign-related information. If the
                                Provider has linked their Google Analytics and
                                Google Ads accounts, Google Ads website
                                conversion tags will read this cookie unless you
                                opt out.
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                Persistent (90 days)
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics 4
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Web analytics/statistics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                _gat_gtag_UA_*
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>
                                The cookie is created and used by Google
                                Analytics to store a unique user ID.
                              </span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            <span style={{ color: "rgb(0, 0, 0)" }}>
                              <span style={{ fontSize: 12 }}>1 day</span>
                            </span>
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google Analytics
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Web analytics/statistics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            1P_JAR
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is used to collect site statistics and
                            track conversion rates.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 month)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ajs_anonymous_id
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used to distinguish anonymous (i.e. not logged in)
                            users. https://segment.com/legal/privacy/
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Segment
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ajs_group_id
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            These cookies are used to record the amount of
                            people that visit our site and track whether you’ve
                            visited before.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Segment
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ajs_user_id
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is set by Segment.io and is used to
                            analyze how you use the website.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Segment
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            JSESSIONID
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is used by New Relic to monitor session
                            counts for an application.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            New Relic
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ki_r
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Initial document.referrer when available for
                            targeting purposes.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Qualaroo
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ki_s
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Current state of any survey the user has viewed or
                            interacted with
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Qualaroo
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ki_t
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Timestamps and view counts
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Qualaroo
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            mixpanelprops
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Cookie created by the builder and read by EB-API to
                            send the properties with the server side mixpanel
                            events.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            mp_*_mixpanel
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is used by the mixpanel to capture the
                            users traits/properties.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Mixpanel
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            NID
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            The NID cookie contains a unique ID that Google uses
                            to remember your preferences and other information
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (6 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Google
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            optimizelyEndUserId
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used by Optimizely
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (6 months)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Optimizely
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            screenWidth
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by segment.js
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Common segment.js
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Analytics
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            _fw_crm_v
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used to track visitor/user identity and chat
                            sessions performed by the user.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Freshchat/Freshworks
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            acc_session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created by accounts.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Accounts
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Auth
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and maintained by accounts
                            for users claim (encrypted).
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Accounts
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ccpaconsent
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            CCPA consent
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - CCPA/GDPR
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            clbDocTraits
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created by the builder, and read by
                            EB-API to send docTraits from server side events.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            consent
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            GDPR consent
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - CCPA/GDPR
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            CookieCreateNew
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Stores information if a document needs to be created
                            to provide a new document funnel.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            disabletests
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is used by all components to disable all
                            the experiments (testing purpose).
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            docTraits
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Cookie created by builder, read by EB-API to send
                            docTraits from server side events.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            DocumentID
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created to store the current documentID.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            emailUpdated
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Contains information for soft reg.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            enteredBuilder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created by the builder to show HIW
                            only once.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            expck
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Contains experiments name and case index.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            firstTimeUser
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created by the builder to check
                            whether or not the user is a first-time user.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            GAClientID
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Cookie created by ECom team on payment page.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 day)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - ECOM
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            glueNotify
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used for job tools to tell your story notifications.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (90 min)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            gtmvalues
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Needed to identify pixel fire on success of
                            Registration /Order Confirmation.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            isFirstTimeUser
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Contains information for first-time users.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ismobile
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Informs if a device is mobile or desktop.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            IsRegisteredUser
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            True, if the user is registered.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Dashboard
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            isssl
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            SSL info of site
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            isTSLoghitCalled
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created when a page is visited via
                            the TSloghit method (using the backend), in order to
                            identify where user came from.&nbsp;
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            lp
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie contains the landing page name.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 day)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            ref
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service to set the referrer ID of
                            a visitor.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            runtest
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is used by all components to set custom
                            variants for some of the experiments (testing
                            purpose).
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            segment_amp_id
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Used by segment.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Segment
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            stk
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Contains information of authority tokens for api
                            services.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Portal
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            UserStatus
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            This cookie is created and maintained by accounts
                            for users info.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Accounts
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            useruid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Contains user useruid.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (1 year)
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Builder
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            visitinfo
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service for the visitors info.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            vssessionuid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service for the visitors session
                            ID.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            vstr
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service for the visitorID.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years )
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            vstrType
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by LiveCareer UK common segment to track a
                            new or returning visitor.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years )
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            vsuid
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service for the visit ID.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Session
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            vsutms
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Created by visitor service for the utm parameters of
                            a visitors.
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Persistent (5 years )
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            LiveCareer UK - Visitor
                          </span>
                        </p>
                      </td>
                      <td style={{ border: "0.5pt solid rgb(0, 0, 0)" }}>
                        <p>
                          <span
                            style={{ color: "rgb(0, 0, 0)", fontSize: "9pt" }}
                          >
                            Necessary
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    3. ADDITIONAL INFORMATION
                  </span>
                </strong>
              </p>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  Here are a few more important things that you should know
                  about the &nbsp;use of cookies/tracking technology on our
                  site:
                </span>
              </p>
              <ul>
                <li
                  style={{
                    listStyleType: "disc",
                    color: "rgb(0, 0, 0)",
                    fontSize: "10pt",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                      We offer certain features that are available only through
                      the use of tracking technology.
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    listStyleType: "disc",
                    color: "rgb(0, 0, 0)",
                    fontSize: "10pt",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                      We use both session and persistent tracking technology.
                      Tracking technology (e.g. cookies) can either be
                      persistent (i.e. they remain on your computer until you
                      delete them) or temporary (i.e. they last only until you
                      close your browser).&nbsp;
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    listStyleType: "disc",
                    color: "rgb(0, 0, 0)",
                    fontSize: "10pt",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                      You are always free to decline tracking technology via
                      your browser, although doing so may interfere with your
                      use of the Site. You may be able to set your cookie
                      preferences in your account profile by accessing My
                      Account – Settings – Privacy Settings, or refer to the
                      Help section of your browser, browser extensions or
                      installed applications for instructions on blocking,
                      deleting or disabling tracking technology such as cookies.
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    listStyleType: "disc",
                    color: "rgb(0, 0, 0)",
                    fontSize: "10pt",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                      We encode and protect the types of tracking technology
                      that the Provider sets so that only we can interpret the
                      information stored in them.
                    </span>
                  </p>
                </li>

                <li
                  style={{
                    listStyleType: "disc",
                    color: "rgb(0, 0, 0)",
                    fontSize: "10pt",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                      You also may encounter tracking technology from third
                      parties on certain pages of the Site that we do not
                      control and have not authorised. (For example, if you view
                      a web page created by another user, there may be a cookie
                      placed by that web page.)
                    </span>
                  </p>
                </li>
              </ul>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <strong>
                  <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                    4.&nbsp;CONTACT US
                  </span>
                </strong>
              </p>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                }}
              >
                <span style={{ color: "rgb(0, 0, 0)", fontSize: "10pt" }}>
                  For any queries in relation to this Cookie and Tracking
                  Technology Policy, please contact us at&nbsp;
                </span>
                <strong>
                  <a
                    href="mailto:support@geniescareerhub.com"
                    style={{ color: "transparent" }}
                  >
                    <u>
                      <span
                        style={{ color: "rgb(0, 0, 255)", fontSize: "10pt" }}
                      >
                        support@geniescareerhub.com
                      </span>
                    </u>
                  </a>
                </strong>
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Page;
