import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { Layout } from "../components/layout/Layout";

import { Hero } from "../pages/Hero/Hero";
import { StepperInfos } from "../pages/StepperInfos/StepperInfos";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route element={<Layout />}>

          <Route
            path="/"
            element={
              <PageTransition>
                <Hero />
              </PageTransition>
            }
          />

          <Route
            path="/stepper"
            element={
              <PageTransition>
                <StepperInfos />
              </PageTransition>
            }
          />

        </Route>

      </Routes>

    </AnimatePresence>
  );
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{
        y: 60,
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{
        y: -60,
        opacity: 0,
        filter: "blur(5px)",
      }}
      transition={{
        duration: 0.15,
        ease: "easeInOut",
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
};