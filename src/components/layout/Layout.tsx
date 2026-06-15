import { Outlet, useLocation } from "react-router-dom";

import styles from "./Layout.module.scss";
import Particles from "../reactbits/background/Particles/Particles";

import { Header } from "../Header/Header";
import { Footer } from "../footer/Footer";
import { GradeHeader } from "../GradeHeader/GradeHeader";

export const Layout = () => {
  const location = useLocation();

  const isGradePage = location.pathname === "/grade-curricular";

  return (
    <div className={styles.container}>
      <Particles
        className={styles.particles}
        particleColors={["#01F0B5"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />

      {isGradePage ? <GradeHeader /> : <Header />}

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};