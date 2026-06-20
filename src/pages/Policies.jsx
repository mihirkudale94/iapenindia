import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, FileText, RefreshCw, AlertCircle } from 'lucide-react';

const Policies = ({ defaultTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const location = useLocation();

  useEffect(() => {
    // Check if route matches specific policy
    if (location.pathname.includes('privacy')) {
      setActiveTab('privacy');
    } else if (location.pathname.includes('terms')) {
      setActiveTab('terms');
    } else if (location.pathname.includes('refund')) {
      setActiveTab('refund');
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="policies-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Legal Agreements</span>
          <h1 className="page-title text-white">Policies & Guidelines</h1>
        </div>
      </section>

      {/* Main content with side tabs */}
      <section className="section policies-section">
        <div className="container grid-4-cols">
          {/* Side tabs */}
          <div className="policies-tabs-column">
            <button 
              className={`policy-tab-link ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <Shield size={18} />
              <span>Privacy Policy</span>
            </button>
            <button 
              className={`policy-tab-link ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <FileText size={18} />
              <span>Terms & Conditions</span>
            </button>
            <button 
              className={`policy-tab-link ${activeTab === 'refund' ? 'active' : ''}`}
              onClick={() => setActiveTab('refund')}
            >
              <RefreshCw size={18} />
              <span>Refund Policy</span>
            </button>
          </div>

          {/* Policy Text Container */}
          <div className="policy-content-column glass-panel card">
            {activeTab === 'privacy' && (
              <div className="policy-block animate-fade">
                <h2>Privacy Policy</h2>
                <span className="last-updated">Last Updated: June 18, 2026</span>
                <p>
                  IAPEN INDIA understands the importance of protecting the privacy of their customers. Our privacy policy has been updated to give you a better understanding of how we treat our data and also to grab your attention to new features. Please review this privacy policy and manner in which the information shall be utilized.
                </p>
                <p>
                  The personal information so collected is used to market, study, analysis, process and improve the services offered by us and our subsidiaries/associates and also to contact you with updates to the website or for other marketing and internal business analytical/review purposes.
                </p>
                <p>
                  For more information on this privacy policy, please read below.
                </p>

                <h3>What Information Does IAPEN INDIA Capture About Visitors to Its Website?</h3>
                <p>
                  The IAPEN INDIA webserver uses an extended log file format which captures: date and time of visit, referring address (location from which visitors comes to IAPEN INDIAs’ website), type of internet browser and visitor’s IP address (Each computer that connects to the internet is assigned a unique number, an IP address, for identification purposes). The log file does not capture a visitor’s email address.
                </p>

                <h3>Does IAPEN INDIA ask for Personal Information?</h3>
                <p>
                  No, IAPEN INDIA do not mandatorily ask for your personal information. There are pages by which a user can contact IAPEN INDIA and by products but sharing personal information is entirely on the discretion of the user and thus at sole risk of the user/customer.
                </p>
                <p>
                  We may encourage you to register your details with personal information for login account purposes only as IAPEN INDIA does not ask for or store any financial information of any party and sharing of personal information during registration process is to contact your updates, new products range and offering which is at choice of the customer.
                </p>
                <p>
                  However, by providing personal information to us when you create or update your account and profile, you are expressly and voluntarily accepting terms and conditions of IAPEN INDIA user agreement and freely accepting and agreeing to our processing of your personal information in ways set out by this privacy policy or as amended from time to time.
                </p>

                <h3>How Does IAPEN INDIA Use The Personal Information?</h3>
                <p>
                  The information collected through this site help us identify the type of website content our customers value most. We use this information to market and improve the website and our services. We also use this information to send you emailers / notifications for various purposes including but not limited to information on new products, best sellers, order processing and to contact you by other means for marketing and other purposes. Our policy is not to give, sell or otherwise distribute the information collected through this site to third parties outside of IAPEN INDIA and its subsidiaries/associates (unless required by the law).
                </p>

                <h3>How Is Information Protection Made at Merchant’s Website?</h3>
                <p>
                  By availing of the goods and services from our website, you understand that there is some risk involved during transmitting to other vendor/bank websites for making necessary payment and all risk attached. There also the transaction is understood and acknowledge by you. Further, since each third party vis-à-vis bank, vendor website, have their own privacy statements that can be viewed by clicking on the corresponding links within each of the respective website. Online merchants, payment gateways and others who participate in our services are encouraged to participate in industry privacy initiatives and to take a responsible attitude towards consumer privacy. However, since we do not have direct control over the policies or practices of participating merchants and other third parties, we are not responsible for the privacy practices or contents of those sites and breach of any ‘sensitive’ information causing any loss, damage to you (direct or indirect) is solely at your risk and IAPEN INDIA shall not be party to such fraudulent practices of any third party vendor. We recommend and encourage that you always review the privacy polices of merchants and other third parties before you provide any personal information or complete any transaction with any third parties.
                </p>

                <h3>How Long the Collected Information Is Retained?</h3>
                <p>
                  IAPEN INDIA keeps your information for as long as your account is active or as needed. However, we may keep certain information even after you close your account if it is necessary to comply with our legal obligations, meet regulatory requirement, resolve dispute, prevent fraud and abuse, or enforce this agreement.
                </p>

                <h3>How Do I Contact IAPEN INDIA?</h3>
                <p>
                  Our corporate postal address is <strong>IAPEN, Survey No. 8/1, Omkar Colony, Lane no. 1, Pimple Gurav, Pune, Maharashtra</strong> email <strong>info@iapenindia.org</strong>. Our best endeavor shall be to support you and resolve all issues in best manner.
                </p>

                <h3>Additional Resources On Information Privacy</h3>
                <p>
                  IAPEN INDIA reserves the right to amend the privacy policy at any time with or without notice. Please check back frequently in the event of changes. Your use of IAPEN INDIA constitutes your agreement to this Privacy Policy.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="policy-block animate-fade">
                <h2>Terms and Conditions</h2>
                <span className="last-updated">Last Updated: June 18, 2026</span>
                <p>
                  <strong>Introduction:</strong> IAPEN INDIA and/or its affiliates provides website features and other products and services to you when you visit or shop at www.iapenindia.org. To use our products or services IAPEN INDIA provides the services subjects to the following terms and conditions. By using products or services through www.iapenindia.org. you will unconditionally agree to the conditions given below.
                </p>
                <p>
                  <strong>Privacy:</strong> Please review our Privacy Policy, which also governs your use of all the information (whether personal or public).
                </p>

                <h3>Electronic Communication</h3>
                <p>
                  When you use any of IAPEN INDIA services, or send emails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by email/text message. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
                </p>

                <h3>Copyright</h3>
                <p>
                  All content included in or made available through any of the availed service, such as text, graphics, logos, button icons, images, video clips, audio clips and data compilations is the property of IAPEN INDIA or its content suppliers and shall be protected and governed by laws of the land in India. All unwarranted copies of content are strictly prohibited and illegal.
                </p>

                <h3>Trademark</h3>
                <p>
                  In addition, graphics, logos, page headers, button icons, scripts and service names included in or made available through any service are trademarks or service mark of IAPEN INDIA or its affiliates or its content suppliers but you by availing of the services does not get any right for copying or using the same.
                </p>

                <h3>Your Login Account</h3>
                <p>
                  If you register yourself with the portal, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility of authenticity of the information and for all activities that occur under your account or password. However, IAPEN INDIA reserves the right to refuse services, terminate accounts, remove or edit content or cancel orders in its sole description with no damage or demure payable to you.
                </p>

                <h3>Risk of Loss</h3>
                <p>
                  All items purchased through electronic mode through this website are made pursuant to a shipment contract. This means that the risk of loss and title for such item pass to upon our delivery to the carrier (Shipping partner) for dispatch.
                </p>

                <h3>Disputes</h3>
                <p>
                  Any dispute or claim relating in any way to your use of any IAPEN INDIA products/service, or to any products or services sold or distributed by IAPEN INDIA or through www.iapenindia.org will be subject to <strong>exclusive jurisdiction of the court of Pune</strong>. We each agree that any dispute resolution proceeding will be conducted only on an individual basis and not in class, consolidated or representative action.
                </p>

                <h3>Services Overview</h3>
                <p>
                  As part of the registration process on the Site, IAPEN INDIA may collect the following personally identifiable information about you: Name including first and last name, alternate email address, mobile phone number and contact details, Postal code, Demographic profile (like your age, gender, occupation, education, address etc.) and information about the pages on the site you visit/access, the links you click on the site, the number of times you access the page and any such browsing information.
                </p>

                <h3>Account &amp; Registration Obligations</h3>
                <p>
                  All shoppers have to register and login for placing orders on the Site. You have to keep your account and registration details current and correct for communications related to your purchases from the site.
                </p>

                <h3>Pricing</h3>
                <p>
                  All the products listed on the Site will be sold at MRP unless otherwise specified. The prices mentioned at the time of ordering be the prices charged on the date of the delivery. Although prices of most of the products do not fluctuate on a daily basis but some of the commodities and fresh food prices do change on a daily basis. In case the prices are higher or lower on the date of delivery additional charges will be collected or refunded as the case may be at the time of the delivery of the order.
                </p>

                <h3>Modification of Terms &amp; Conditions of Service</h3>
                <p>
                  IAPEN INDIA may at any time modify the Terms &amp; Conditions of Use of the Website without any prior notification to you. You can access the latest version of these Terms &amp; Conditions at any given time on the Site. You should regularly review the Terms &amp; Conditions on the Site. In the event the modified Terms &amp; Conditions is not acceptable to you, you should discontinue using the Service. However, if you continue to use the Service you shall be deemed to have agreed to accept and abide by the modified Terms &amp; Conditions.
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="policy-block animate-fade">
                <h2>Refund and Returns Policy</h2>
                <span className="last-updated">Last Updated: June 18, 2026</span>
                
                <h3>Return, Refund And Title</h3>
                <p>
                  IAPEN INDIA does not take title to returned items. Any case of refund or cancellation is at sole discretion of IAPEN INDIA.
                </p>
                <p>
                  In case of refund, refund is processed within <strong>10 working days</strong>, order to claim the refund proper document evidence and track history is necessary.
                </p>
                <p>
                  In case of natural calamity or unforeseen circumstances if delivery gets delayed or cancelled only value of product be refunded, no shipping charges will be refunded.
                </p>
                <p>
                  Once the order processes for dispatch, cancellation is not allowed.
                </p>

                <h3>Cancellation by Site / Customer</h3>
                <p>
                  You as a customer can cancel your order anytime up to the cut-off time of the slot i.e. before the product gets dispatched for which you have placed an order by calling our customer service or directly on the website. If we suspect any fraudulent transaction by any customer or any transaction which defies the terms &amp; conditions of using the website, we at our sole discretion could cancel such orders. We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;
