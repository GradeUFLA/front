import { ArrowRight, Dot, LayoutDashboard } from 'lucide-react';
import styles from './Hero.module.scss';
import Particles from '../../components/Particles/Particles';
import CountUp from '../../components/CountUp/CountUp';


export const Hero = () => {
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
            <div className={styles.header}>
                <div className={styles.logo}>
                    <span className={styles.imgLogo}> <LayoutDashboard size={20} strokeWidth={1} /></span>
                    <h4 className={styles.name}> Grade<span>UFLA</span></h4>
                </div>
                <p className={styles.sobre}>Sobre</p>
            </div>

            <div className={styles.content}>
                <div className={styles.matriculaBadge}>
                    <span className={styles.dot}>
                        <Dot />
                    </span>
                    <p>MATRÌCULAS 2026/2 ABERTAS</p>
                </div>

                <div className={styles.description}>
                    <h2 className={styles.title}>Monte sua grade <span>em segundos.</span></h2>
                    <p className={styles.subtitle}>A ferramenta definitiva para o planejamento acadêmico na UFLA. Organize seu semestre com inteligência, evite conflitos e otimize seu tempo.</p>
                </div>

                <div className={styles.buttons}>
                    <button className={styles.continueBtn}>Começar Agora <ArrowRight /> </button>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.copyright}>
                    <p>&copy; 2026 GradeUFLA <Dot /> Desenvolvido para a comunidade acadêmica.</p>
                </div>

                <div className={styles.metrics}>
                    <p>Usuários ativos <span><CountUp
                        from={0}
                        to={1000}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        delay={0}
                    />+</span></p>
                    <p>Grades criadas <span><CountUp
                        from={0}
                        to={5000}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        delay={0}
                    />+</span></p>
                </div>
            </div>
        </div>
    );
};