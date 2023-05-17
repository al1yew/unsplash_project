import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "../context";

const url = `https://api.unsplash.com/search/photos?client_id=${
    import.meta.env.VITE_API_KEY
}&query=`;

const Gallery = () => {
    const { searchTerm } = useGlobalContext();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["images", searchTerm],
        queryFn: async () => {
            const res = await axios.get(url.concat(searchTerm));
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <section className="image-container">
                <h4>loading...</h4>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="image-container">
                <h4>{error}</h4>
            </section>
        );
    }

    const results = data.results;
    if (results.length < 1) {
        return (
            <section className="image-container">
                <h4>no results found...</h4>
            </section>
        );
    }

    return (
        <section className="image-container">
            {results.map((item) => {
                const imageUrl = item?.urls?.regular;

                return (
                    <img
                        src={imageUrl}
                        key={item.id}
                        alt={item.alt_description}
                        className="img"
                    />
                );
            })}
        </section>
    );
};
export default Gallery;
