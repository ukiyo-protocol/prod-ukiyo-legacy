import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { Link as Linked } from "react-router-dom";
import Footer from '../../common/Footer/Footer';
import Header from '../../common/Header/Header';
import "./NewsBlog.scss";
import LeftArrow from '../../../assets/Images/left.svg';

const NewsBlog = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <section className='privacy'>
                <div className='privacy_sec'>
                    <Container>
                        <Row>
                            <Col lg={5}>
                                <div className='privacy_sec_left'>
                                    <Linked to="/"><div className='d-flex align-items-center text-white fs-1'>
                                        <span><img src={LeftArrow} alt="left_arrow" /></span>
                                        {/* <Header /> */}Back</div></Linked>
                                    <h1><span>News</span> Ukiyo</h1>
                                    <p>Follow our latest developments</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className='privacy_content'>
                    <Container>
                        <Row>
                            <Col lg={5}>
                                <div className='privacy_content_left'>
                                    <ul>
                                        <li><Link activeClass="active"
                                            to="intro"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Introduction And Overview</Link></li>
                                        <li><Link activeClass="active"
                                            to="changes"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Changes to Privacy Policy</Link></li>
                                        <li><Link activeClass="active"
                                            to="collection-info"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Information Collection</Link></li>
                                        <li><Link activeClass="active"
                                            to="info-use"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Use of Information</Link></li>
                                        <li><Link activeClass="active"
                                            to="sharing"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Sharing and Disclosure of Information</Link></li>
                                        <li><Link activeClass="active"
                                            to="other-parties"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Other Parties</Link></li>
                                        <li><Link activeClass="active"
                                            to="analytics"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Analytics</Link></li>
                                        <li><Link activeClass="active"
                                            to="rights-choices"
                                            spy={true}
                                            offset={-70}
                                            duration={500}>Your Rights And Choices</Link></li>
                                        <li><Link activeClass="active"
                                            to="data-security"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>Data Security</Link></li>
                                        <li><Link activeClass="active"
                                            to="internation-transfer"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>International Transfer</Link></li>
                                        <li><Link activeClass="active"
                                            to="children"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>Children</Link></li>
                                        <li><Link activeClass="active"
                                            to="contact-us"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>Contact Us</Link></li>
                                        <li><Link activeClass="active"
                                            to="data-subjects"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>Additional Disclosures For Data Subjects</Link></li>
                                        <li><Link activeClass="active"
                                            to="california"
                                            spy={true}
                                            // smooth={true}
                                            offset={-70}
                                            duration={500}>Additional Disclosures For California Residents</Link></li>
                                    </ul>
                                </div>
                            </Col >
                            <Col lg={7}>
                                <div className='privacy_content_data'>
                                    <ul>
                                        <li>
                                            <div className='privacy_content_right' id="intro">
                                                <h2>INTRODUCTION AND OVERVIEW</h2>
                                                <div className='hl'></div>
                                                <p>
                                                    This Privacy Policy (the “Privacy Policy”) provides a comprehensive description of how ukiyo LLC, ukiyo DAO S.A. and ukiyo Labs Limited (referred to as ukiyo Labs” “we”, “our” or “us”) collects, uses and shares information about you in connection with the website.</p>
                                                <p>
                                                    By accessing or using the Site, you agree to our Terms Of Service (the “Terms”) and understand that the terms represent a binding agreement between you and us. By using the Services, you also agree to our collection, use, and disclosure practices, as well as any other activities described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, you should immediately discontinue the use of the Services and refrain from accessing the site. If you have any questions or wish to exercise your rights and choices, please contact us at the email or portal address set forth in the “Contact Us” section below. If you are a data subject in the European Economic Area, the United Kingdom, or a resident of Canada, please see the additional disclosures at the end of this Privacy Policy.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="changes">
                                                <h2>Changes To Privacy Policy</h2>
                                                <div className='hl'></div>
                                                <p>
                                                    We reserve the right to revise and reissue this Privacy Policy at any time. Any changes will be effective immediately upon our posting of the Revised Privacy Policy. For the avoidance of doubt, your continued use of the services indicates your consent to the Revised Privacy Policy then posted.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="collection-info">
                                                <h2>Information Collection</h2>
                                                <div className='hl'></div>
                                                <h3>Information You Provide</h3>
                                                <p>We may collect the following information about you when you use the Services:</p>
                                                <ul className='inner_list'>
                                                    <li>
                                                        <p>Content, within any messages you send to us (such as feedback and questions to information support).</p>
                                                    </li>
                                                </ul>
                                                <p>
                                                    You may choose to voluntarily provide other information to us that we have not solicited from you, and, in such instances, you are solely responsible for such information.
                                                </p>
                                                <h3>Information Collected Automatically</h3>
                                                <p>Although at this time we do not automatically collect information from you when you access the ukiyo Labs’ services, it is possible that we may in the future. We would utilize this information to operate and ensure the security, reliability, and robust performance of our Services. We may also use tracking technologies to automatically collect information including the following</p>
                                                <ul className='inner_list'>
                                                    <li><p>Log files, which are files that record events that occur in connection with your use of the ukiyo Labs. Log files are created when you view content or otherwise interact with the Services.</p></li>
                                                    <li><p>Cookies, which are small data files stored on your device that act as a unique tag to identify your browser. We will only use strictly necessary cookies in connection with the Site and Services. For the avoidance of doubt, the cookies that we include are essential for you to browse the site and use its features, including accessing secure areas of the Site.</p></li>
                                                </ul>
                                                <p>For further information on how we use tracking technologies for analytics, and your rights and choices regarding them, please see the “Analytics” and “Your Rights And Choices” sections below.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="info-use">
                                                <h2>Use Of Information</h2>
                                                <div className='hl'></div>
                                                <p>We do not anticipate using, but we may collect and use, information for business purposes in accordance with the practices described in this Privacy Policy. Our business purposes for collecting and using information include:</p>
                                                <ul className="inner_list">
                                                    <li><p>Operating and managing the services; performing Services requested by you, such as responding to your comments, questions, and requests, and providing information support; sending you technical notices, updates, security alerts, information regarding changes to our policies, and support and administrative messages; detecting, preventing, and addressing fraud, breach of Terms, and threats, or harm; and compliance with legal and regulatory requirements.</p></li>
                                                    <li><p>Protecting the security and integrity of the Services; improving the services and other websites, apps, products, and services; conducting promotions, such as hack-a-thons, including to verify your eligibility and deliver prizes in connection with your entries; and fulfilling any other business purpose, with notice to you and your consent.</p></li>
                                                </ul>
                                                <p>Notwithstanding the above, we may use information that does not identify you (including information that has been aggregated or de-identified) for any purpose except as prohibited by applicable law. For information on your rights and choices with respect to how we use information about you, please see the “Your Rights And Choices” section below.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="sharing">
                                                <h2>Sharing And Disclosure Of Information</h2>
                                                <div className='hl'></div>
                                                <p>If share or disclose information that we collect, we do so in accordance with the practices described in this privacy policy. the categories of parties with whom we may share information include:</p>
                                                <ul className='inner_list'>
                                                    <li><p>Affiliates. We Share Information With Our Affiliates And Related Entities, Including Where They Act As Our Service Providers Or For Their Own Internal Purposes.</p></li>
                                                    <li><p>Service Providers. We Share Information With Third-Party Service Providers For Business Purposes, Including Fraud Detection And Prevention, Security Threat Detection, Payment Processing, Customer Support, Data Analytics, Information Technology, Storage, And Transaction Monitoring. Any Information Shared With Such Service Providers Is Subject To The Terms Of This Privacy Policy. All Service Providers That We Engage With Are Restricted To Only Utilizing The Information On Our Behalf And In Accordance With Our Instructions.</p></li>
                                                    <li><p>Professional Advisors. We share information with our professional advisors for purposes of audits and compliance with our legal obligations.</p></li>
                                                    <li><p>Merger Or Acquisition. We share information in connection with, or during negotiations of, any proposed or actual merger, purchase, sale or any other type of acquisition or business combination of all or any portion of our assets, or transfer of all or a portion of our business to another business.</p></li>
                                                    <li><p>Security And Compelled Disclosure. We share information to comply with the law or other legal process, and where required, in response to lawful requests by public authorities, including to meet national security or law enforcement requirements.</p></li>
                                                    <li><p>Facilitating Requests. We may share information about you at your request or direction.</p></li>
                                                    <li><p>Consent. We may share information about you with your consent.</p></li>
                                                </ul>
                                                <p>Notwithstanding the above, we may share information that does not identify you (including information that has been aggregated or de-identified) except as prohibited by applicable law. For information on your rights and choices regarding how we share information about you, please see the “Your Rights And Choices” section below.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="other-parties">
                                                <h2>Other Parties</h2>
                                                <div className='hl'></div>
                                                <p>We may integrate technologies operated or controlled by other parties into parts of the services. For Example, the services may include links that hyperlink to websites, platforms, and other services not operated or controlled by us.</p>
                                                <p> Please note that when you interact with other parties, including when you leave the site, those parties may independently collect information about you and solicit information from you. the information collected and stored by those parties remains subject to their own policies and practices, including what information they share with us, your rights and choices on their services and devices, and whether they store information in the u.s. or elsewhere. we encourage you to familiarize yourself with and consult their privacy policies and terms of use.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="analytics">
                                                <h2>Analytics</h2>
                                                <div className='hl'></div>
                                                <p>We do not use analytics services for this Site.</p>
                                            </div>

                                            <div className='privacy_content_right' id="rights-choices">
                                                <h2>Your Rights And Choices</h2>
                                                <div className='hl'></div>
                                                <ul className="inner_list">
                                                    <li><p>Cookies. we will only use strictly necessary cookies. these cookies are essential for you to browse the site and use its features, including accessing secure areas of the site.</p></li>
                                                    <li><p>Do Not Track. Your browser settings may allow you to automatically transmit a “Do Not Track” signal to the online services you visit. Note, however, there is no industry consensus as to what site and app operators should do with regard to these signals. Accordingly, unless and until the law is interpreted to require us to do so, we do not monitor or take action with respect to “Do Not Track” signals. For more information on “Do Not Track,” visit http://www.allaboutdnt.com.</p></li>
                                                </ul>
                                                <p>PLEASE BE AWARE THAT IF YOU DISABLE OR REMOVE TRACKING TECHNOLOGIES SOME PARTS OF THE UKIYO PROTOCOL SERVICES MAY NOT FUNCTION CORRECTLY.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="data-security">
                                                <h2>Data Security</h2>
                                                <div className='hl'></div>
                                                <p>We implement and maintain reasonable administrative, physical, and technical security safeguards to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Nevertheless, transmission via the internet is not completely secure and we cannot guarantee the security of information about you.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="internation-transfer">
                                                <h2>International Transfer</h2>
                                                <div className='hl'></div>
                                                <p>Please be aware that information collected through the services may be transferred to, processed, stored, and used in the European Economic Area, the United Kingdom, United States, and other jurisdictions. Data protection laws in the EU and other jurisdictions may be different from those of your country of residence. Your use of the services or provision of any information therefore constitutes your consent to the transfer to and from, processing, usage, sharing, and storage of information about you in the EU and other jurisdictions as set out in this privacy policy.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="children">
                                                <h2>Children</h2>
                                                <div className='hl'></div>
                                                <p>The services are intended for general audiences and are not directed at children. To use the services, you must legally be able to enter into the agreement. We do not knowingly collect personal information (as defined by the U.S. Children’s Privacy Protection Act, or “COPPA”) from children. If you are a parent or guardian and believe we have collected personal information in violation of COPPA, please contact us at privacy@ukiyo.network and we will remove the personal information in accordance with COPPA.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="contact-us">
                                                <h2>Contact Us</h2>
                                                <div className='hl'></div>
                                                <p>
                                                    If You Have Any Questions Or Comments About This Privacy Policy, Our Data Practices, Or Our Compliance With Applicable Law, Please Contact Us:
                                                </p>
                                                <ul className='ps-0'>
                                                    <li><p>By Email: hello@ukiyo.network</p></li>
                                                    <li><p>By Mail: <br />Ukiyo Labs Limited.</p></li>
                                                    <li><p>167-169 Great Portland Street <br />5Th Floor, London, London, <br />England, W1W 5PF <br /><br /></p></li>
                                                    <li><p>Ukiyo LLC</p></li>
                                                    <li><p>Euro House</p></li>
                                                    <li><p>Richmond Hill Road</p></li>
                                                    <li><p>Kingstown St.</p></li>
                                                    <li><p>Saint Vincent And The Grenadines</p></li>
                                                    <li><p>P.O. Box. 2897</p></li>
                                                    <li><p>Kingstown, VC0100</p></li>
                                                    <li><p>Tel: +1 784 485 6124 <br /><br /></p></li>
                                                    <li><p>Ukiyo DAO S.A.</p></li>
                                                    <li><p>Registered Agent:</p></li>
                                                    <li><p>Intershore Consult (BVI) Ltd.</p></li>
                                                    <li><p>Intershore Chambers</p></li>
                                                    <li><p>3Rd Floor, Geneva Place</p></li>
                                                    <li><p>Road Town, Tortola</p></li>
                                                    <li><p>190 Elgin Avenue</p></li>
                                                    <li><p>George Town, Grand Cayman</p></li>
                                                    <li><p>KY1-9008, Cayman Islands</p></li>
                                                    <li><p>Tel: +1 284 494 3415</p></li>
                                                </ul>
                                                <p>
                                                    This Privacy Policy Has Been Designed To Be Accessible To People With Disabilities. If You Experience Any Difficulties Accessing The Information Here, Please Contact Us At privacy@ukiyo.network.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="data-subjects">
                                                <h2>Additional Disclosures for Data Subjects in the European Economic Area and the United Kingdom</h2>
                                                <div className='hl'></div>
                                                <ul className='inner_list'>
                                                    <li>
                                                        <h4>Roles</h4>
                                                        <p>The General Data Protection Regulations in the European Economic Area and the United Kingdom (“GDPR”) distinguish between organizations that process personal data for their own purposes (known as “controllers”) and organizations that process personal data on behalf of other organizations (known as “Processors”). We act as a controller with respect to personal data collected as you interact with the Services.</p>
                                                    </li>
                                                    <li>
                                                        <h4>Lawful Basis For Processing</h4>
                                                        <p>The GDPR requires a “lawful basis” for processing personal data. Our lawful bases include where: (i) You have given consent to the processing for one or more specific purposes, either to us or to our service providers or partners; (ii) Processing is necessary for the performance of a contract with you; (iii) Processing is necessary for compliance with a legal obligation; or (iv) Processing is necessary for the purposes of the legitimate interests pursued by us or a third party, and your interests and fundamental rights and freedoms do not override those interests. Where applicable, we will transfer your personal data to third parties subject to appropriate or suitable safeguards, such as standard contractual clauses.</p>
                                                    </li>
                                                    <li>
                                                        <h4>Your Data Subject Rights</h4>
                                                        <p>
                                                            If you are a user in the European Economic Area or the united kingdom, you maintain certain rights under the GDPR. these rights include the right to (i) Request access and obtain a copy of your personal data; (Ii) Request rectification or erasure of your personal data; (Iii) Object to or restrict the processing of your personal data; and (Iv) Request portability of your personal data. Additionally, if we have collected and processed your personal data with your consent, you have the right to withdraw your consent at any time.
                                                        </p>
                                                        <p>
                                                            Notwithstanding the foregoing, we cannot edit or delete information that is stored on a particular blockchain. this information may include transaction data (i.e., purchases, sales, and transfers) related to your blockchain wallet address and any NFTs held by your wallet address.
                                                        </p>
                                                        <p>
                                                            To exercise any of these rights, please contact us via our email or postal address listed in the “Contact Us” section above and specify which right you are seeking to exercise. We will respond to your request within thirty (30) days. We may require specific information from you to help us confirm your identity and process your request. Please note that we retain information as necessary to fulfill the purpose for which it was collected and may continue to retain and use information even after a data subject request in accordance with our legitimate interests, including as necessary to comply with our legal obligations, resolve disputes, prevent fraud, and enforce our agreements.
                                                        </p>
                                                        <p>If you have any issues with our compliance, please contact us as set out in the “Contact Us” section above. You also reserve the right to lodge a complaint with the data protection regulator in your jurisdiction.</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='privacy_content_right' id="california">
                                                <h2>Additional Disclosures for California Residents</h2>
                                                <div className='hl'></div>
                                                <p>These additional disclosures apply only to california residents. the california consumer privacy act of 2018 (“CCPA”) provides additional rights to know, delete, and opt-out, and requires businesses collecting or disclosing personal information to provide notices and the means to exercise consumer rights.</p>
                                                <ul className='inner_list'>
                                                    <li>
                                                        <h4>Roles</h4>
                                                        <p>We collect the following categories of personal information enumerated in the CCPA</p>
                                                        <ul className="inner_list">
                                                            <li><p>Internet Activity – including information on visitors to the site and their interactions with the ukiyo labs.</p></li>
                                                            <li><p>Geolocation data of site visitors.</p></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <p>For further details on the information we may collect, including the sources from which we receive information, review the “Information Collection” section above. We may collect and use these categories of personal information for the business purposes described in the “Use Of Information” section above, including to manage the services. We do not “Sell” personal information as defined under the CCPA. Please review the “Sharing and Disclosure Of Information” section above for further details about the categories of parties with whom we share information.</p>
                                                <ul className="inner_list">
                                                    <li>
                                                        <h4>Right To Know And Delete</h4>
                                                        <p>You have the right to know certain details about our data practices within the past twelve (12) months. In particular, you may request the following from us:</p>
                                                        <ul className="inner_list">
                                                            <li><p>The categories of personal information we have collected about you.</p></li>
                                                            <li><p>The categories of sources from which the personal information was collected.</p></li>
                                                            <li><p>The categories of personal information about you we disclosed for a business purpose.</p></li>
                                                            <li><p>The categories of third parties to whom the personal information was disclosed for a business purpose.</p></li>
                                                            <li><p>The business or commercial purpose for collecting or selling the personal information. and</p></li>
                                                            <li><p>The specific pieces of personal information we have collected about you.</p></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <p>In addition, you have the right to delete the personal information we have collected from you. to exercise any of these rights, please submit a request by emailing us at privacy@ukiyo.network. In The request, please specify which right you are seeking to exercise and the scope of the request. We will confirm receipt of your request within ten (10) days. We may require specific information from you to help us verify your identity and process your request. If we are unable to verify your identity, we may deny your requests to know or delete.</p>
                                                <ul className="inner_list">
                                                    <li>
                                                        <h4>Authorized Agent</h4>
                                                        <p>You may designate an authorized agent to submit requests on your behalf. However, we may require written proof of the agent’s permission to act on your behalf and verify your identity directly.</p>
                                                    </li>
                                                    <li>
                                                        <h4>Right of Non-Discrimination</h4>
                                                        <p>You have a right of non-discrimination for the exercise of any of your privacy rights guaranteed by law, such as the right to access, delete, or opt-out of the sale of your personal information.</p>
                                                    </li>
                                                    <li>
                                                        <h4>Shine The Light</h4>
                                                        <p>Customers who are residents of California may request (i) A list of the categories of personal information disclosed by us to third parties during the immediately preceding calendar year for those third parties’ own direct marketing purposes. (ii) A list of the categories of third parties to whom we disclosed such information. to exercise a request, please write to us at the email or postal address set out in the “Contact Us” section above and specify that you are making a “California Shine the Light Request.” We may require additional information from you to allow us to verify your identity and are only required to respond to requests once per calendar year.</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row >
                    </Container >
                </div >
                <Footer />
            </section>
        </>
    );
};

export default NewsBlog;