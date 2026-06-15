type Props = {
    tab: string;
    setTab: (tab: any) => void;
};

export function SubjectTabs({
    tab,
    setTab,
}: Props) {

    return (
        <>
            <button
                onClick={() =>
                    setTab("OBRIGATORIAS")
                }
            >
                Obrigatórias
            </button>

            <button
                onClick={() =>
                    setTab("ELETIVAS")
                }
            >
                Eletivas
            </button>

            <button
                onClick={() =>
                    setTab("FUTURAS")
                }
            >
                Futuras
            </button>
        </>
    );
}