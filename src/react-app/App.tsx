import { AppProvider, useApp } from "./context/AppContext";
import { QuizScreen } from "./pages/QuizScreen";
import { RegistrationScreen } from "./pages/RegistrationScreen";
import { ResultsScreen } from "./pages/ResultsScreen";
import { BriefingScreen } from "./pages/BriefingScreen";
import { SchedulingScreen } from "./pages/SchedulingScreen";

function AppContent() {
  const { currentStep } = useApp();

  // Render screens based on current step
  switch (currentStep) {
    case 1:
      return <QuizScreen />;
    case 2:
      return <RegistrationScreen />;
    case 3:
      return <ResultsScreen />;
    case 4:
      return <BriefingScreen />;
    case 5:
      return <SchedulingScreen />;
    default:
      return <QuizScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
