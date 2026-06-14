import styles from "./Grade.module.scss";

import { GradeHeader } from "./components/GradeHeader/GradeHeader";
import { SelectedSidebar } from "./components/SelectedSidebar/SelectedSidebar";
import { SubjectsSidebar } from "./components/SubjectsSidebar/SubjectsSidebar";
import { WeeklyGrid } from "./components/WeeklyGrid/WeeklyGrid";

import { useLocation } from "react-router-dom";

export function Grade() {

    const location = useLocation();

    const { grade } = location.state;

    return (
        <div className={styles.container}>
            <GradeHeader />

            <div className={styles.content}>

                <SubjectsSidebar
                    grade={grade}
                />

                <WeeklyGrid />

                <SelectedSidebar />

            </div>
        </div>
    );
}