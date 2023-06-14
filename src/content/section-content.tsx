import Carousel from "react-material-ui-carousel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import smartTeachers from "../assets/smartTeachers.png";
import teachingPersonnel from "../assets/teachingPersonnel.png";
import CEPL from "../assets/CEPL.png";
import zoom from "../assets/zoom.png";
import powerpoint from "../assets/powerpoint.png";
import bramble from "../assets/bramble.png";
import googleClassroom from "../assets/googleClassroom.png";
import studentNTeacher from "../assets/happy-student-teacher.png";
import learningEnv from "../assets/learning-environment.png";
import potential from "../assets/potential.png";
import { motion } from "framer-motion";

// const container = {
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

const itemRight = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const itemLeft = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const displayAccordions = (): JSX.Element[] => {
  const accordionAccomplisments = [
    {
      summary:
        "PSHE (Personal, Social, Health and Economic education) Co-ordinator",
      details: `The profile of PSHE was elevated for all pupils through my creation of a PSHE curriculum. 
      The intention was to allow pupils to gain therequired knowledge, 
      skills and understanding to be able to lead confident, healthy and independent lives.`,
    },
    {
      summary: "RRSA (Rights Respecting School Awards) Lead",
      details: `I initiated the process of allowing the school to become a ’Rights
      Respecting School’ and encouraged the school community to place the
      UN Convention on the Rights of the Child at the heart of the
      school’s ethos and curriculum.`,
    },
    {
      summary: "Reading Co-ordinator",
      details: `As a result of implementing new initiatives, I was able to raise the
      profile of reading in the school. Monthly ‘early morning reading
      sessions’ for parents/ carers were organised as well as visits to
      the local library and Book Fairs.`,
    },
    {
      summary: "School-Based/ NQT (New Qualified Teacher) Mentor",
      details: `My role was to promote the growth and development of the student
      teachers that I mentored. Through modelling and frequent
      conversations, I was able to pass on invaluable knowledge helping
      the students to not only develop their educational voice but to
      consolidate their own effective and efficient teaching style.`,
    },
  ];

  return accordionAccomplisments.map((accordion, index) => {
    return (
      <Accordion disableGutters={true} className="shadow-none">
        <AccordionSummary
          className="bg-regal-blue text-white"
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          component={motion.div}
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 1 }}
        >
          {accordion.summary}
        </AccordionSummary>
        <AccordionDetails className="bg-light-grey">
          {accordion.details}
        </AccordionDetails>
      </Accordion>
    );
  });
};

const sectionContent = [
  {
    id: "welcome",
    title: "Welcome to Russell Online Learning",
    content: (
      <p className="welcome-text">
        To laugh as you learn and enjoy the process
      </p>
    ),
  },
  {
    id: "aboutROL",
    title: "About Russell Online Learning",
    content: (
      <div>
        <p>
          Has the Covid pandemic left your child behind in their academic
          learning? Are you disappointed with their end of year report? Do you
          need support in helping them to catch up on their missed learning?
          <br />
          Get expert support and effective teaching from Russell Online
          Learning!
        </p>
        <p>
          I offer tailor-made online lessons focusing on Maths and English, to
          provide intensive support for children that need to catch up on their
          missed learning.
        </p>
      </div>
    ),
  },
  {
    id: "ethos",
    title: "My Ethos",
    content: (
      // items-center
      <div className="flex flex-row">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ ease: "easeIn", duration: 0.4 }}
          viewport={{ once: false }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -150 },
          }}
        >
          <div className="flex flex-col items-center flex-1 mr-auto">
            <p>
              <b>Create an enthusiastic learning environment</b>
            </p>
            <img
              className="w-48 mt-auto"
              src={learningEnv}
              alt="learningEnvironment"
            />
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ ease: "easeIn", duration: 0.3 }}
          viewport={{ once: false }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 150 },
          }}
        >
          <div className="flex flex-col items-center justify-center flex-1 ">
            <p>
              <b>Nurture a strong student/teacher relationship</b>
            </p>
            <img
              className="w-64 mt-auto"
              src={studentNTeacher}
              alt="StudentNTeacher"
            />
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ ease: "easeIn", duration: 0.3 }}
          viewport={{ once: false }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 150 },
          }}
        >
          <div className="flex flex-col items-center flex-1 ml-auto">
            <p>
              <b>Teach to maximise every child’s full potential</b>
            </p>
            <img
              className="w-48 mt-auto"
              src={potential}
              alt="learningEnvironment"
            />
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "aboutMe",
    title: "About Me",
    content: (
      <div>
        <p>
          My name is Veronica Russell, a primary school teacher with 9 years'
          experience working with children of differing abilities in inner
          London schools. Specializing in Maths and English (Reading and
          Writing), I have a wealth of experience teaching children from age 6
          to 9 (Year 2 – Year 4).
        </p>
        <br />
        <p>
          Currently assigned to four primary schools as a registered tutor
          through the NTP – National Tutoring Programme, I deliver bespoke
          programmes to provide intensive support for children that need to
          catch up on their missed learning. The NTP is a government funded
          programme so, to ensure that I was suitable for this role, a vigorous
          training and vetting process was undertaken. I also currently hold an
          enhanced DBS check.
        </p>
        <>
          <br />
          <p>
            I am currently registered with three Education Recruitment Agencies:
          </p>
          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div className="pt-4 flex flex-row justify-evenly items-center">
              <motion.div variants={itemRight}>
                <img
                  className="w-96"
                  src={teachingPersonnel}
                  alt="TeachingPersonnel"
                />
              </motion.div>
              <motion.div variants={itemRight}>
                <img className="w-96" src={smartTeachers} alt="SmartTeachers" />
              </motion.div>
              <motion.div variants={itemRight}>
                <img className="w-96" src={CEPL} alt="CEPL" />
              </motion.div>
            </div>
          </motion.div>
        </>
        {/* className="w-26" */}
        <>
          <br />
          <p>Also proficient in a number of learning platforms:</p>
          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  staggerDirection: -1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div className="flex flex-row justify-evenly items-center">
              <motion.div variants={itemLeft}>
                <img className="w-24" src={zoom} alt="zoom" />
              </motion.div>
              <motion.div variants={itemLeft}>
                <img className="w-24" src={powerpoint} alt="powerpoint" />
              </motion.div>
              <motion.div variants={itemLeft}>
                <img className="w-60" src={bramble} alt="bramble" />
              </motion.div>
              <motion.div variants={itemLeft}>
                <img
                  className="w-40"
                  src={googleClassroom}
                  alt="googleClassroom"
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      </div>
    ),
  },
  {
    id: "accomplishments",
    title: "My Accomplishments",
    content: (
      <div>
        <p>
          <b>​November 2019</b>
          <br />
          Personal recognition in ‘Good’ Religious Education Ofsted report
          (Section 48 report)
        </p>

        <p className="mb-3">
          <b>September 2018 /July 2019</b>
          <br />
          Exceptional progress made by my Year 4 class
        </p>
        <p className="mb-2">
          <b>September 2016 – July 2019</b>
        </p>
        {displayAccordions()}
        <br />
        <p>
          During my teaching career I have also had direct responsibility of
          overseeing year groups. I have acquired the status of being Head of
          KS1, Lower Key Stage 2 and Year 2. This entailed ensuring that the
          teachers and teaching assistants of a number of different classes,
          worked as a cohesive team to create an environment where all the needs
          of our pupils were met, and they were in a position to excel.
        </p>
      </div>
    ),
  },
  {
    id: "testimonials",
    title: "Testimonials",
    content: (
      <div>
        <p>
          To inspire pupils to thrive in their environment is integral to my
          teaching and is reflected in the testimonies below:
        </p>
        <br />
        <Carousel autoPlay={false}>
          <div>
            <h3>
              <b>Head teacher of Hopton Primary School</b>
            </h3>
            <p>
              I have to give Veronica Russell a mention as she is amazing. The
              children love working with her and she is so engaging.
            </p>
          </div>
          <div>
            <h3>
              <b>Maxine - Parent</b>
            </h3>
            <p>
              Since my daughter has been having these online weekly sessions her
              self-esteem has grown, she is much more motivated and I have seen
              a willingness to learn. These lessons have given her an extra
              sense of responsibility because she wants to do well.
            </p>
          </div>
          <div>
            <h3>
              <b>Marcia - Parent</b>
            </h3>
            <p>
              My daughter really enjoys her lessons and looks forward to them.
              She is dedicated and keeps the notes that she makes during the
              lesson so that she can revise. I can also see an improvement in
              her confidence.
            </p>
          </div>
          <div>
            <h3>
              <b>Elizabeth - Parent</b>
            </h3>
            <p>
              You were able to keep my child engaged and I can see an
              improvement in her maths skills. Her times table is also better.
            </p>
          </div>
          <div>
            <h3>
              <b>Meliyah - Child</b>
            </h3>
            <p>
              I really found my online lessons enjoyable and learnt so many
              different things – commutative law inverse, the 4 operations in
              maths and so much more.
            </p>
          </div>
          <div>
            <h3>
              <b>Mekayni - Child</b>
            </h3>
            <p>
              These online lessons have taught me a lot. I look forward to these
              lessons and feel I am getting better and better.
            </p>
          </div>
          <div>
            <h3>
              <b>Lilian - Child</b>
            </h3>
            <p>
              I think that these lessons have helped me – I know more about
              place value. I am more confident with times and division. Before
              these lessons I did not know anything about commutative law now I
              know so much about it.
            </p>
          </div>
          <div>
            <h3>
              <b>Richard - Child</b>
            </h3>
            <p>
              These lessons have gone really well. I wanted to see if I could be
              challenged and these lessons have challenged me and I have been
              taught things I did not know.
            </p>
          </div>
        </Carousel>
      </div>
    ),
  },
  {
    id: "sessionsAndPrices",
    title: "Sessions and Prices",
    content: (
      <div>
        <p>Avaliable Sessions</p>
        <div className="flex flex-row justify-evenly">
          <div>
            <p className="text-regal-blue">
              <b>£25p/h</b>
            </p>
            <p>
              Year 2 Maths and English
              <br />
              Online sessions aimed at addressing gaps in their Key Stage 1
              knowledge
            </p>
          </div>
          <div>
            <p className="text-regal-blue">
              <b>£30p/h</b>
            </p>
            <p>
              Year 3 & 4 Maths and English
              <br />
              Online sessions aimed at addressing gaps in their Key Stage 2
              knowledge
            </p>
          </div>
        </div>
        <br />
        <p>To book a lesson please use the contact form below</p>
        <p>
          During the first session, I will perform a free Maths or English
          assessment
        </p>
      </div>
    ),
  },
];

export default sectionContent;
