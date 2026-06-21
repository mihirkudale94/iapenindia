import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import orgStructureImg from '../assets/organization-structure-image.png';

const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

const About = () => (
  <div className="about-page animate-slide-up">
    <Helmet>
      <title>About IAPEN India</title>
      <meta
        name="description"
        content="Learn about IAPEN India, its multidisciplinary mission, research, education, global collaboration, and vision for a malnutrition-free future."
      />
    </Helmet>
    <section className="page-header bg-primary-dark">
      <div className="container">
        <span className="page-subtitle">The Association</span>
        <h1 className="page-title text-white">About IAPEN India</h1>
      </div>
    </section>

    <section className="section history-section">
      <div className="container official-copy-layout">
        <Reveal>
          <span className="section-subtitle">
            Pioneering Excellence in Clinical Nutrition and Health Care
          </span>
          <h2 className="section-title text-left">
            About IAPEN INDIA Association for Parenteral and Enteral Nutrition
          </h2>
          <p>
            The IAPEN INDIA Association for Parenteral and Enteral Nutrition (IAPEN INDIA),
            incorporated under CIN <strong>U85320PN2019NPL186896</strong> as a Section 8
            Not-for-Profit Charitable Organization, stands at the forefront of India’s nutritional
            healthcare revolution. Headquartered at{' '}
            <strong>
              Survey No. 8/1, Omkar Colony, Lane No. 1, Pimple Gurav, Pune, Maharashtra – 411061,
              India
            </strong>
            .
          </p>
          <p>
            IAPEN INDIA is dedicated to advancing the rigorous science and evidence-based practice
            of clinical nutrition and metabolic care. By integrating cutting-edge research with
            multidisciplinary collaboration, we address the pervasive challenge of malnutrition—both
            disease-related and socioeconomic—in hospital, community, and long-term care settings.
          </p>
          <p>
            Our mission is rooted in the principle that optimal nutrition is not merely supportive
            but fundamental to physiological healing, metabolic recovery, and enhanced quality of
            life, as substantiated by global epidemiological data linking malnutrition to prolonged
            hospital stays, increased morbidity, and elevated healthcare costs.
          </p>
          <p>
            As India’s premier national body aligned with esteemed international Parenteral and
            Enteral Nutrition (PEN) societies such as the European Society for Clinical Nutrition
            and Metabolism (ESPEN), the American Society for Parenteral and Enteral Nutrition
            (ASPEN), and the South Asia Association for Parenteral and Enteral Nutrition (SAPEN),
            IAPEN INDIA embodies a progressive, globally connected platform. We foster seamless
            transitions in the continuum of care, from acute hospital interventions to home-based
            nutritional support, employing validated tools like the Malnutrition Universal Screening
            Tool (MUST), Subjective Global Assessment (SGA), and GLIM criteria to ensure timely,
            personalized interventions. Our commitment extends to bridging gaps in nutritional
            epidemiology, where we advocate for policies informed by randomized controlled trials
            (RCTs) and meta-analyses demonstrating the efficacy of parenteral and enteral nutrition
            in reducing complications in critically ill patients.
          </p>
        </Reveal>

        <Reveal>
          <h2>A Multidisciplinary Association for Professional Empowerment</h2>
          <p>
            IAPEN India unites a diverse cadre of healthcare professionals including physicians,
            surgeons, dietitians, nurses, pharmacists, and other healthcare professionals in a
            collaborative ecosystem designed to elevate clinical standards. Through
            interprofessional education grounded in the latest scientific literature, we empower
            members to implement integrated nutrition care pathways that align with international
            guidelines, such as those from the International Society for Clinical Nutrition and
            Metabolism. This approach not only mitigates risks like refeeding syndrome and
            micronutrient deficiencies but also promotes metabolic optimization through
            evidence-based protocols, including precision nutrition tailored to genetic and
            phenotypic profiles.
          </p>
          <p>
            Our organizational structure under the strategic oversight of the Board of Directors
            propels this mission forward: the National Executive Committee (NEC) provides
            leadership, the National Advisory Council fosters expert advice on policy and
            legislative matters, formulating policies for inclusive growth, while regional Chapters
            and specialized Core Groups drive localized initiatives. These entities spearhead the
            development of position papers, consensus statements, and national guidelines, drawing
            on systematic reviews and cohort studies to inform best practices. IAPEN INDIA’s
            progressive agenda includes robust advocacy with government agencies, non-governmental
            organizations (NGOs), academic institutions, and universities to influence public health
            policies. By collaborating with global partners, we amplify India’s voice in
            international forums, contributing to advancements in areas like immunonutrition and gut
            microbiome modulation for enhanced patient outcomes.
          </p>
        </Reveal>

        <Reveal>
          <h2>Driving Innovation Through Education, Research, and Global Collaboration</h2>
          <p>
            At the heart of IAPEN India’s operations is a commitment to scientific excellence and
            innovation. We organize high-impact events, including national and international
            congresses, symposia, workshops, and webinars, featuring keynote sessions on emerging
            topics like nutrition in neonatal and pediatric conditions, women’s health, nutritional
            assessments, nutrition in metabolic diseases, nutrition in various diseases like renal,
            liver, cardiac and cancer, nutrigenomics, bioenergetics in critical care, and
            sustainable enteral and parenteral formulations. These platforms facilitate knowledge
            exchange, supported by our official publications: the Journal of Nutrition Research and
            the Insight Newsletter, which disseminate peer-reviewed articles, systematic reviews,
            and clinical case studies.
          </p>
          <p>
            Our research initiatives emphasize translational science, from bench-to-bedside
            applications, including multicenter studies on the impact of nutrition—oral or
            enteral—on health outcomes and the role of pharmaconutrients in diseases. By fostering
            partnerships with leading institutions, IAPEN INDIA is pioneering digital tools for
            nutritional assessment, such as AI-driven apps for real-time metabolic monitoring,
            ensuring scalability across India’s diverse healthcare landscape.
          </p>
        </Reveal>

        <Reveal>
          <h2>Vision for a Malnutrition-Free Future: Nutrition as Everyone’s Responsibility</h2>
          <p>
            IAPEN INDIA envisions a progressive India where clinical nutrition is embedded in every
            facet of healthcare, from preventive community programs to advanced tertiary care. We
            are committed to building resilient health systems that prioritize equity,
            accessibility, and evidence-based interventions, positioning ourselves as the preeminent
            association with a strong global presence. IAPEN India champions a unified approach
            where nutrition is everyone’s responsibility. With its vision anchored in collaboration,
            education, and compassion, the Association continues to lead India’s movement toward
            better health through better nutrition and drives us to cultivate a culture of shared
            accountability, address malnutrition, and endorse mission statements like the “Chennai
            Declaration,” where doctors optimize therapeutic regimens, dietitians design
            individualized plans, nurses monitor compliance, and pharmacists ensure safe nutrient
            delivery.
          </p>
          <p>
            As we expand our footprint through new Chapters and international alliances, IAPEN INDIA
            invites professionals, researchers, and stakeholders to join our movement. Together, we
            are not just combating malnutrition; we are redefining healthcare through scientific
            rigor, compassionate care, and unwavering global collaboration.
          </p>
          <p>
            For more information on membership, events, or partnerships, explore our resources and
            connect with us today.
          </p>
          <div className="official-copy-actions">
            <Link to="/membership" className="btn btn-primary">
              Explore Membership
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Connect With Us
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-title-wrapper text-center">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Organisation Structure</h2>
          </div>
          <div className="glass-panel organisation-chart-panel">
            <img src={orgStructureImg} alt="IAPEN India organisation structure" />
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);

export default About;
