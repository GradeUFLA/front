import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { SelectedSubject, GradeResponse, DisciplinaGrade } from "../types/grade";


type GradeNumber = 1 | 2 | 3;

type GradesState = {
    1: SelectedSubject[];
    2: SelectedSubject[];
    3: SelectedSubject[];
};

type GradeContextType = {
    gradeAtual: GradeNumber;
    grades: GradesState;

    previewDisciplina: DisciplinaGrade | null;

    setPreviewDisciplina: (
        disciplina: DisciplinaGrade | null
    ) => void;

    trocarGrade: () => void;

    adicionarMateria: (
        materia: SelectedSubject
    ) => void;

    removerMateria: (
        disciplinaCursoId: number
    ) => void;

    creditosAtuais: number;

    gradeCompleta: GradeResponse | null;

    setGradeCompleta: (
        grade: GradeResponse
    ) => void;

    gradeSelecionada: SelectedSubject[];

    pendingSubject: {
        materia: SelectedSubject;
        conflitos: SelectedSubject[];
    } | null;

    setPendingSubject: (
        subject: {
            materia: SelectedSubject;
            conflitos: SelectedSubject[];
        } | null
    ) => void;

    removerMaterias: (
        materias: SelectedSubject[]
    ) => void;
};

const GradeContext = createContext<
    GradeContextType | null
>(null);

type Props = {
    children: ReactNode;
};

export function GradeProvider({
    children,
}: Props) {
    const [gradeAtual, setGradeAtual] =
        useState<GradeNumber>(1);

    const [grades, setGrades] =
        useState<GradesState>({
            1: [],
            2: [],
            3: [],
        });

    const [gradeCompleta, setGradeCompleta] =
        useState<GradeResponse | null>(null);

    const [
        previewDisciplina,
        setPreviewDisciplina,
    ] = useState<DisciplinaGrade | null>(
        null
    );

    const [
        pendingSubject,
        setPendingSubject,
    ] = useState<{
        materia: SelectedSubject;
        conflitos: SelectedSubject[];
    } | null>(null);

    function trocarGrade() {
        setGradeAtual((prev) => {
            if (prev === 1) return 2;
            if (prev === 2) return 3;

            return 1;
        });
    }

    function adicionarMateria(
        materia: SelectedSubject
    ) {
        setGrades((prev) => ({
            ...prev,
            [gradeAtual]: [
                ...prev[gradeAtual].filter(
                    (item) =>
                        item.disciplina.disciplinaCursoId !==
                        materia.disciplina.disciplinaCursoId
                ),
                materia,
            ],
        }));
    }

    function removerMateria(
        disciplinaCursoId: number
    ) {
        setGrades((prev) => ({
            ...prev,
            [gradeAtual]: prev[
                gradeAtual
            ].filter(
                (item) =>
                    item.disciplina
                        .disciplinaCursoId !==
                    disciplinaCursoId
            ),
        }));
    }

    function removerMaterias(
        materias: SelectedSubject[]
    ) {

        setGrades((prev) => ({
            ...prev,

            [gradeAtual]: prev[
                gradeAtual
            ].filter(
                (item) =>
                    !materias.some(
                        (m) =>
                            m.disciplina
                                .disciplinaCursoId ===
                            item.disciplina
                                .disciplinaCursoId
                    )
            ),
        }));
    }

    const creditosAtuais = useMemo(() => {
        return grades[gradeAtual].reduce(
            (total, item) =>
                total + item.disciplina.creditos,
            0
        );
    }, [grades, gradeAtual]);

    const gradeSelecionada = grades[gradeAtual];
    return (
        <GradeContext.Provider
            value={{
                gradeAtual,
                grades,

                gradeCompleta,
                setGradeCompleta,

                previewDisciplina,
                setPreviewDisciplina,

                trocarGrade,

                adicionarMateria,
                removerMateria,

                creditosAtuais,

                gradeSelecionada,

                pendingSubject,
                setPendingSubject,

                removerMaterias
            }}
        >
            {children}
        </GradeContext.Provider>
    );
}

export function useGrade() {
    const context = useContext(GradeContext);

    if (!context) {
        throw new Error(
            "useGrade deve ser usado dentro do GradeProvider"
        );
    }

    return context;
}