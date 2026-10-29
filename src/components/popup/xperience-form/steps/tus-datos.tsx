export default function TusDatos({ nextStep }: { nextStep: () => void }) {
  return (
    <div>
      formulario 1 <button onClick={nextStep}>Siguiente</button>
    </div>
  );
}
