import Gallery from "./components/Gallery";
import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
    return (
        <main>
            <ThemeToggle />
            <SearchForm />
            <Gallery />
        </main>
    );
};
export default App;
