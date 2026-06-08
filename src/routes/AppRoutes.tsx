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
import { MateriasConcluidas } from "../pages/MateriasConcluidas/MateriasConcluidas";
import { Grade } from "../pages/Grade/Grade";

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

          <Route
            path="/materias-concluidas"
            element={
              <PageTransition>
                <MateriasConcluidas />
              </PageTransition>
            }
          />

          <Route
            path="/grade-curricular"
            element={
              <PageTransition>
                <Grade />
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};