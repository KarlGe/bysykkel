import BaseMapOverlay from "../MapOverlay/BaseMapOverlay";

type Props = { isInitialLoad: boolean; hasError: boolean };

function StationsError({ hasError, isInitialLoad }: Props) {
  if (!hasError) {
    return null;
  }
  return (
    <BaseMapOverlay closeable={false} title="En uventet feil oppstod">
      <p>
        En feil oppstod imens vi hentet informasjon fra Oslo Bysykkel. <br />
        Vennligst prøv igjen senere
      </p>
      {!isInitialLoad && (
        <p>
          Du kan fortsette å finne stasjoner i kartet, men antall ledige sykler
          vil sannsynligvis ikke være korrekt
        </p>
      )}
    </BaseMapOverlay>
  );
}

export default StationsError;
