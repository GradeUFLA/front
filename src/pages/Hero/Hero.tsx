import { ArrowRight, Dot, LayoutDashboard } from 'lucide-react';
import styles from './Hero.module.scss';

export const Hero = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.logo}><LayoutDashboard size={20}/></span>
                <h4 className={styles.name}> Grade<span>UFLA</span></h4>
            </div>

            <div className={styles.content}>
                <div className={styles.matriculaBadge}>
                    <p> <Dot size={70}/> MATRÌCULAS 2026/2 ABERTAS</p>
                </div>

                <div className={styles.description}>
                    <h2 className={styles.title}>Monte sua grade <span>em segundos.</span></h2>
                    <p className={styles.subtitle}>A ferramenta definitiva para o planejamento acadêmico na UFLA. Organize seu semestre com inteligência, evite conflitos e otimize seu tempo.</p>                    
                </div>

                <div className={styles.buttons}>
                    <button className={styles.primaryButton}>Começar Agora <ArrowRight /> </button>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.copyright}>
                    <p>&copy; 2026 GradeUFLA <Dot /> Desenvolvido para a comunidade acadêmica.</p>
                </div>

                <div className={styles.metrics}>
                    <p>Usuários ativos <span>1,000+</span></p>
                    <p>Grades criadas <span>5,000+</span></p>
                </div>
            </div>
        </div>
    );
};