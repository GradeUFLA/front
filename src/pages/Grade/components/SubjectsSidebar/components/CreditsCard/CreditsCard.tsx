type Props = {
    creditos: number;
};

export function CreditsCard({
    creditos,
}: Props) {

    return (
        <div>
            Total de créditos

            <strong>
                {creditos}
            </strong>
        </div>
    );
}